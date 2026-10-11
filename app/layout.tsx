import type { Metadata } from 'next';
import './globals.css';
import './stage.css';
export const metadata: Metadata={title:'Blue Hour · 爵士合奏实验室',description:'听见彼此，找到你的声部。无需读谱的爵士入门互动学习环境。',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
