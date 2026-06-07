from flask import Blueprint, request, jsonify
from db import users

auth_bp = Blueprint("auth", __name__)
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.json

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    username = username.strip()
    email = email.strip().lower()

    existing_user = users.find_one({
        "$or": [
            {"username": username},
            {"email": email}
        ]
    })

    if existing_user:

        if existing_user["username"] == username:
            return jsonify({
                "message": "Username already exists"
            }), 400

        if existing_user["email"] == email:
            return jsonify({
                "message": "Email already exists"
            }), 400

    users.insert_one({
        "username": username,
        "email": email,
        "password": password
    })

    return jsonify({
        "message": "Registration successful"
    }), 201

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.json

    username = data.get("username")
    password = data.get("password")

    user = users.find_one({
        "username": username
    })

    if not user:
        return jsonify({
            "message": "User not found"
        }), 401

    if user.get("password") != password:
        return jsonify({
            "message": "Invalid password"
        }), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "username": user["username"],
            
        }
    }), 200

@auth_bp.route("/users", methods=["GET"])
def get_users():

    users_list = []

    for user in users.find({}, {"password": 0}):

        users_list.append({
            "username": user["username"],
            
        })

    return jsonify(users_list), 200