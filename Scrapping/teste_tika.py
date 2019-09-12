
import tika

from tika import parser

file_path = "Provas\\PROVA_2_2018.pdf"
content = parser.from_file(file_path)
if 'content' in content:
    text = content['content']
    text = str(text)
    safe_text = text.encode('utf-8', errors='ignore')
    safe_text = str(safe_text).replace('\\', '\\\\').replace('"', '\\"')
    print(safe_text)
