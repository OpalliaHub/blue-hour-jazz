"""Reproduce the curated ChoCo chord corpus from a local clone of its pinned release.

Usage: python3 lib/standard-catalog-generate.py /path/to/choco
Only reads the CC BY 4.0 iReal playlist annotations. It never reads sheet music,
lyrics or recordings. The selection is fixed by source IDs already in the output.
"""
import hashlib
import json
import math
import pathlib
import re
import subprocess
import sys

COMMIT = '5fe168fd55be5c84512abcfbc4e6f1b1f8f0092a'
ALIASES = {
    '': '', '-': 'm', '-7': 'm7', '^7': 'maj7', '^': 'maj7',
    'h7': 'm7b5', 'h': 'm7b5', 'o7': 'dim7', 'o': 'dim',
    '-6': 'm6', '-9': 'm9', '-^7': 'mMaj7', '-11': 'm11',
    '^9': 'maj9', '^7#11': 'maj7#11', '7sus': '7sus4',
    '9sus': '9sus4', '7at': '7alt', '69': '6/9',
}
SUPPORTED = {
    '', 'm', 'm7', 'maj7', 'm7b5', 'dim7', 'dim', 'm6', '6', '9', '13',
    '7', '7b9', '7#9', '7alt', 'mMaj7', 'sus4', '7sus4', 'maj9', 'm9',
    '7#11', '7b13', 'm11', '7#5', 'maj7#11', '9sus4', '7#9#5',
    '7b5', '13b9', '9#11', '7b9b5', '6/9',
}

def chord(raw):
    match = re.fullmatch(r'([A-G][b#]?)([^/]*)(/[A-G][b#]?)?', raw)
    if not match:
        raise ValueError(f'Unsupported chord: {raw}')
    root, suffix, bass = match.groups()
    suffix = ALIASES.get(suffix, suffix)
    if suffix not in SUPPORTED:
        raise ValueError(f'Unsupported quality: {raw}')
    return root + suffix + (bass or '')

def convert(path):
    raw = path.read_bytes()
    data = json.loads(raw)
    annotations = {a['namespace']: a['data'] for a in data['annotations']}
    assert annotations['timesig'] and all(a['value'] == {'numerator': 4, 'denominator': 4} for a in annotations['timesig'])
    changes = []
    for item in annotations['chord_ireal']:
        # ChoCo's iReal converter encodes score time as measure + beatOffset/10.
        time = item['time']
        absolute = (math.floor(time) - 1) * 4 + (time % 1) * 10
        duration = item['duration']
        assert abs(absolute - round(absolute)) < 1e-6
        assert abs(duration - round(duration)) < 1e-6
        changes.append([round(absolute), chord(item['value']), round(duration)])
    assert changes[0][0] == 0
    assert all(a[0] + a[2] == b[0] for a, b in zip(changes, changes[1:]))
    total = changes[-1][0] + changes[-1][2]
    assert total % 4 == 0 and 0 < total <= 1024
    chords = []
    for beat in range(0, total, 4):
        chords.append(next(x[1] for x in reversed(changes) if x[0] <= beat))
    key = annotations['key_mode'][0]['value'].replace(':major', '').replace(':minor', ' minor')
    return {
        'id': path.stem, 'title': data['file_metadata']['title'],
        'sourceCredit': data['file_metadata']['artist'],
        'style': data['sandbox']['genre'], 'key': key,
        'bars': total // 4, 'chords': chords, 'changes': changes,
        'sourceSha256': hashlib.sha256(raw).hexdigest(),
    }

def main():
    revision = subprocess.check_output(['git', '-C', sys.argv[1], 'rev-parse', 'HEAD'], text=True).strip()
    if revision != COMMIT:
        raise ValueError(f'Expected source commit {COMMIT}; found {revision}')
    output = pathlib.Path(__file__).with_name('standard-catalog-data.ts')
    # Existing output is the selection manifest; external optional argument seeds it.
    if len(sys.argv) == 3:
        ids = json.loads(pathlib.Path(sys.argv[2]).read_text())
    else:
        ids = re.findall(r'"id":"(ireal-pro_\d+)"', output.read_text())
    source = pathlib.Path(sys.argv[1]) / 'partitions/ireal-pro/choco/playlists/jams'
    records = [convert(source / (source_id + '.jams')) for source_id in ids]
    assert len(records) >= 220
    assert len({re.sub(r'[^a-z0-9]', '', r['title'].lower()) for r in records}) == len(records)
    header = '''/** Generated from the CC BY 4.0 ChoCo iReal playlist annotations.
 * Reproduce with standard-catalog-generate.py. See /REPERTOIRE-LICENSES.txt.
 * No source melody, lyric, recording or score image is included.
 */
export interface StandardChartData {
  id: string; title: string; sourceCredit: string; style: string; key: string;
  bars: number; chords: string[];
  /** [absolute quarter-note beat, chord symbol, duration in quarter notes] */
  changes: [number, string, number][];
  sourceSha256: string;
}
export const STANDARD_CHART_DATA: StandardChartData[] = [
'''
    output.write_text(header + ',\n'.join(json.dumps(r, ensure_ascii=False, separators=(',', ':')) for r in records) + '\n];\n')
    print(f'Generated {len(records)} distinct 4/4 chord-chart entries.')

if __name__ == '__main__':
    main()
