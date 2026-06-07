from flask import Flask
from flask_cors import CORS
from routes.task import tasks_bp
from routes.auth import auth_bp
from routes.share import share_bp   


app = Flask(__name__)

CORS(app, origins=["http://localhost:5173", "http://localhost:5000"])

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(tasks_bp,url_prefix="/api/tasks")
app.register_blueprint(share_bp, url_prefix="/api/share")



@app.route("/", methods=["GET"])
def home():
    return {
        "message": "Todo API Running"
    }


if __name__ == "__main__":
    app.run(debug=True)