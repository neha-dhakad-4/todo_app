from flask import Blueprint
from flask import request
from flask import jsonify

from db import tasks

tasks_bp = Blueprint(
    "tasks",
    __name__
) 

@tasks_bp.route(
    "/create-task",
    methods=["POST"]
)
def create_task():

    data = request.json

    task_name = data.get("taskName")
    due_date = data.get("dueDate")
    due_time = data.get("dueTime")
    assigned_by = data.get("assignedBy")
    assigned_to = data.get("assignedTo")

    task = {
        "taskName": task_name,
        "dueDate": due_date,
        "dueTime": due_time,
        "assignedBy": assigned_by,
        "assignedTo": assigned_to,
        "status": "pending"
    }

    result = tasks.insert_one(task)

    return jsonify({
        "message": "Task created successfully",
        "taskId": str(result.inserted_id)
    }), 201
  

  # Get Tasks Assigned To User
@tasks_bp.route(
    "/assigned-tasks/<username>",
    methods=["GET"]
)
def get_assigned_tasks(username):

    assigned_tasks = []

    for task in tasks.find({"assignedTo": username}):
        task["_id"] = str(task["_id"])
        assigned_tasks.append(task)

    return jsonify(assigned_tasks)

from bson import ObjectId

@tasks_bp.route(
    "/delete-task/<task_id>",
    methods=["DELETE"]
)
def delete_task(task_id):

    result = tasks.delete_one({
        "_id": ObjectId(task_id)
    })

    if result.deleted_count == 0:
        return jsonify({
            "message": "Task not found"
        }), 404

    return jsonify({
        "message": "Task deleted successfully"
    }), 200

@tasks_bp.route(
    "/update-task-status/<task_id>",
    methods=["PATCH"]
)
def update_task_status(task_id):
    data = request.json or {}
    new_status = data.get("status", "done")

    result = tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"status": new_status}}
    )

    if result.matched_count == 0:
        return jsonify({
            "message": "Task not found"
        }), 404

    return jsonify({
        "message": "Task status updated successfully",
        "status": new_status
    }), 200

@tasks_bp.route(
    "/copy-task/<task_id>",
    methods=["POST"]
)
def copy_task(task_id):

    data = request.json

    new_date = data.get("dueDate")

    task = tasks.find_one({
        "_id": ObjectId(task_id)
    })

    if not task:
        return jsonify({
            "message": "Task not found"
        }), 404

    task.pop("_id")

    task["dueDate"] = new_date

    result = tasks.insert_one(task)

    return jsonify({
        "message": "Task copied successfully",
        "taskId": str(result.inserted_id)
    }), 201