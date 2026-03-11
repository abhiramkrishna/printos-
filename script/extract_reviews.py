import urllib.request

url = "https://share.google/CFGlFjNTOvmhRRczZ"

req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)

try:
    with urllib.request.urlopen(req) as response:
        print("Final URL:", response.geturl())
except Exception as e:
    print(f"Error: {e}")
