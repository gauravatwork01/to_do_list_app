
import * as notifications from "./notifications.js";

class label_select_label_events {

    static register_check_event(li_el) {
        let compl_tasks_list_el = document.querySelector("ul.completed-tasks-list");
        let inp_radio_el = li_el.querySelector('input[type="radio"]');
        inp_radio_el.addEventListener("change", (e) => {
            inp_radio_el.removeAttribute("name");
            li_el.querySelector("label.select-label").classList.add("no-cursor-pointer");
            compl_tasks_list_el.appendChild(li_el);
            notifications.update_task_counts();
        });
    }

    static register_mouse_over(li_el) {
        li_el.querySelector("label").addEventListener("mouseover", (e) => {
            let parent_ul_el = li_el.closest("ul");
            let div_mark_el = li_el.querySelector("div#mark");

            if (parent_ul_el.classList.contains("task-list")) {
                div_mark_el.setAttribute("class", "");
                div_mark_el.classList.add("checkmark");
            } else if (parent_ul_el.classList.contains("completed-tasks-list")) {
                //
            }
        });
    }


    static register_mouse_out(li_el) {
        li_el.querySelector("label").addEventListener("mouseout", (e) => {
            let parent_ul_el = li_el.closest("ul");
            let div_mark_el = li_el.querySelector("div#mark");

            if (parent_ul_el.classList.contains("task-list")) {
                div_mark_el.setAttribute("class", "");
                div_mark_el.classList.add("line-mark");
            } else if (parent_ul_el.classList.contains("completed-tasks-list")) {
                //
            }
        });
    }
}


class btn_remove_icon_events {
    static register_btn_remove_from_task_list(btn) {
        btn.addEventListener("click", (e) => {
            btn.parentElement.parentElement.remove();
            notifications.update_task_counts();
        });
    }
}



class li_task_list_item_events {

    static register_li_mouse_over(li_el) {
        li_el.addEventListener("mouseover", (e) => {
            li_el.querySelector("button.remove-icon").style.visibility = "visible";
        });
    }

    static register_li_mouse_out(li_el) {
        li_el.addEventListener("mouseout", (e) => {
            li_el.querySelector("button.remove-icon").style.visibility = "hidden";
        });
    }
}

class task_list {

    static counter = 0;

    static add() {
        task_list.counter++;

        let new_li = document.createElement("li");
        new_li.classList.add("task-list-item");
        let inp_el = document.querySelector("div.input-container input");
        let id = "id" + task_list.counter;
        new_li.innerHTML = `<div class="li-content">
                            <label for="${id}" class="select-label">
                                <input type="radio" name="test" id="${id}" class="label-input radio-input-select">
                                <div class="checkmark-cont">
                                    <div class="line-mark" id="mark">
    
                                    </div>
                                </div>
                                <span class="label-text">${inp_el.value}</span>
                            </label>
                            <button class="remove-icon remove-from-task-list">X</button>
                            </div>`;
        document.querySelector("div.task-container ul.task-list").appendChild(new_li);
        inp_el.value = "";

        li_task_list_item_events.register_li_mouse_over(new_li);
        li_task_list_item_events.register_li_mouse_out(new_li);

        label_select_label_events.register_mouse_over(new_li);
        label_select_label_events.register_mouse_out(new_li);
        label_select_label_events.register_check_event(new_li);

        btn_remove_icon_events.register_btn_remove_from_task_list(new_li.querySelector("button.remove-icon"));

        notifications.update_task_counts();
    }
}

class div_input_container_events {

    static input_user_task_input() {
        let inp_el = document.querySelector("div.input-container input");
        inp_el.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                task_list.add();
            }
        })
    }

    static button_add_to_task() {
        let btn = document.querySelector("div.input-container button.add-to-task");
        btn.addEventListener("click", (e) => {
            task_list.add();
        });
    }

}




class clear_task_events {

    static a_clear_pending_tasks() {
        document.querySelector("a.clear-pending-tasks").addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector("ul.task-list").innerHTML = "";
            notifications.update_task_counts();
        });
    }

    static a_clear_compl_tasks() {
        document.querySelector("a.clear-compl-tasks").addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector("ul.completed-tasks-list").innerHTML = "";
            notifications.update_task_counts();
        });
    }
}



function DOMContentLoaded_register_events() {
    div_input_container_events.input_user_task_input()
    div_input_container_events.button_add_to_task();

    clear_task_events.a_clear_pending_tasks();
    clear_task_events.a_clear_compl_tasks();
}


document.addEventListener("DOMContentLoaded", DOMContentLoaded_register_events);

