from flask import Blueprint,render_template,request,redirect,url_for,flash,session
from app import db
from app.models import Task

tasks_bp=Blueprint('tasks',__name__)

@tasks_bp.route('/')
def view_tasks():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    
    tasks=Task.query.all()
    return render_template('tasks.html',tasks=tasks)
 
@tasks_bp.route('/add',methods=['GET','POST'])
def add_task():
    if 'user' not in session:
        return redirect(url_for('auth.login'))
    
    title=request.form.get('title')
    if title:
        new_task=Task(title=title,status='Pending')
        db.session.add(new_task)
        db.session.commit()
        flash('Task added succesfully','success')

    return redirect(url_for('tasks.view_tasks'))

@tasks_bp.route('/toggle/<int:task_id>',methods=['POST'])
def toggle_status(task_id):
    task=Task.query.get(task_id)
    if task:
        if task.status=='Pending':
            task.status='Working'
        elif task.status=='Working':
            task.status='Done'
        else:
            task.status='Pending'
        db.session.commit()

    return redirect(url_for('tasks.view_tasks'))
                    
@tasks_bp.route('/clear',methods=['POST'])
def clear_tasks():
    Task.query.delete()
    db.session.commit()
    flash('All tasks cleared!','info')
    return redirect(url_for('tasks.view_tasks'))

@tasks_bp.route('/update/<int:task_id>', methods=['GET', 'POST'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    if request.method == 'POST':
        new_title = request.form.get('title')
        if not new_title:
            flash('Title cannot be empty', 'danger')
            return redirect(request.url)

        task.title = new_title
        db.session.commit()
        flash('Task updated successfully', 'success')
        return redirect(url_for('tasks.view_tasks'))

    return render_template('update.html', task=task)


@tasks_bp.route('/delete/<int:task_id>', methods=['GET', 'POST'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    db.session.delete(task)
    db.session.commit()
    flash('Task deleted successfully!', 'info')
    return redirect(url_for('tasks.view_tasks'))


