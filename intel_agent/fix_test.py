from flask import Flask, request

app = Flask(__name__)

# This route accepts LITERALLY ANYTHING
@app.route('/', defaults={'path': ''}, methods=['POST', 'GET'])
@app.route('/<path:path>', methods=['POST', 'GET'])
def debug_all(path):
    print(f"\n🚀 WE GOT A HIT!")
    print(f"Path: /{path}")
    print(f"Body: {request.get_data(as_text=True)}")
    return "SUCCESS: YOUR KALI MACHINE RECEIVED THIS.", 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4242)
