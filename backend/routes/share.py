from flask import Blueprint
from flask import request
from flask import jsonify
from db import shared_lists
from bson import ObjectId
share_bp = Blueprint(
    "share",
    __name__
)

@share_bp.route(
    "/share-list",
    methods=["POST"]
)
def share_list():

    data = request.json

    shared_by = data.get(
        "sharedBy"
    )

    shared_to = data.get(
        "sharedTo"
    )

    tasks = data.get(
        "tasks"
    )

    if not shared_by:
        return jsonify({
            "message":
            "sharedBy is required"
        }), 400

    if not shared_to:
        return jsonify({
            "message":
            "sharedTo is required"
        }), 400

    if not tasks:
        return jsonify({
            "message":
            "No tasks to share"
        }), 400

    shared_lists.insert_one({

        "sharedBy":
        shared_by,

        "sharedTo":
        shared_to,

        "tasks":
        tasks

    })

    return jsonify({

        "message":
        "Todo list shared successfully"

    }), 201

@share_bp.route(
    "/shared-with-me/<username>",
    methods=["GET"]
)
def shared_with_me(username):

    shared_data = list(
        shared_lists.find(
            {
                "sharedTo":
                username
            }
        )
    )

    result = []

    for item in shared_data:

        result.append({

            "_id":
            str(item["_id"]),

            "sharedBy":
            item["sharedBy"],

            "tasks":
            item["tasks"]

        })

    return jsonify(result), 200

@share_bp.route(
    "/delete-shared-list/<id>",
    methods=["DELETE"]
)
def delete_shared_list(id):

    result = shared_lists.delete_one(
        {
            "_id":
            ObjectId(id)
        }
    )

    if result.deleted_count == 0:

        return jsonify({
            "message":
            "List not found"
        }), 404

    return jsonify({
        "message":
        "Shared list deleted"
    }), 200