export function update_task_counts() {
    let pending_cnt = document.querySelectorAll("ul.task-list li").length;
    document.querySelector("span.pending-tasks-total").textContent = pending_cnt;

    let compl_cnt = document.querySelectorAll("ul.completed-tasks-list li").length;
    document.querySelector("span.compl-tasks-total").textContent = compl_cnt;
}