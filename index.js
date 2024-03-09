


class task_list {
    static counter = 0;

    static update_task_counts() {
        let pending_cnt = document.querySelectorAll("ul.task-list li").length;
        document.querySelector("span.pending-tasks-total").textContent = pending_cnt;

        let compl_cnt = document.querySelectorAll("ul.completed-tasks-list li").length;
        document.querySelector("span.compl-tasks-total").textContent = compl_cnt;
    }

    static add_to_task_list() {
        task_list.counter++;

        let new_li = document.createElement("li");
        new_li.classList.add("task-list-li");
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

        listener_cl.register_li_mouse_events(new_li);
        listener_cl.register_btn_remove_from_task_list(new_li.querySelector("button"));
        listener_cl.register_li_label_task_cont_hover_events(new_li);
        listener_cl.register_task_list_li_complete_event(new_li);
        listener_cl.register_a_clear_task_event();
        task_list.update_task_counts();
        inp_el.value = "";
    }
}


class listener_cl {
    // function naming convention rigister_<element>_<purpose/class>()
    static register_btn_add_to_task() {
        let btn = document.querySelector("div.input-container button.add-to-task");
        btn.addEventListener("click", (e) => {
            task_list.add_to_task_list();
        });
    }

    static register_inp_add_to_task() {
        let inp_el = document.querySelector("div.input-container input");
        inp_el.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                task_list.add_to_task_list();
            }
        })
    }

    static register_btn_remove_from_task_list(btn) {
        btn.addEventListener("click", (e) => {
            btn.parentElement.parentElement.remove();
            task_list.update_task_counts();
        });
    }

    static register_btns_remove_from_task_list() {
        let btns = document.querySelectorAll("div.task-container ul li button.remove-from-task-list");

        for (let btn of btns) {
            listener_cl.register_btn_remove_from_task_list(btn);
        }
    }


    static register_li_mouse_events(li_el) {
        li_el.addEventListener("mouseover", (e) => {
            li_el.querySelector("button.remove-icon").style.visibility = "visible";
        });

        li_el.addEventListener("mouseout", (e) => {
            li_el.querySelector("button.remove-icon").style.visibility = "hidden";
        });
    }
    // function naming convention rigister_<element>_<purpose/class>()
    static register_li_task_complete(li_el) {
        let compl_tasks_list_el = document.querySelector("ul.completed-tasks-list");
        let inp_radio_el = li_el.querySelector('input[type="radio"]');
        inp_radio_el.addEventListener("change", (e) => {
            compl_tasks_list_el.appendChild(li_el);
        })

    }

    static register_task_list_li_complete_event(li_el) {




        let compl_tasks_list_el = document.querySelector("ul.completed-tasks-list");
        let inp_radio_el = li_el.querySelector('input[type="radio"]');
        inp_radio_el.addEventListener("change", (e) => {
            inp_radio_el.removeAttribute("name");
            li_el.querySelector("label.select-label").classList.add("no-cursor-pointer");
            compl_tasks_list_el.appendChild(li_el);
            task_list.update_task_counts();
        })
    }
    // li_label of task-container 
    static register_li_label_task_cont_hover_events(li_el) {

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

    static register_a_clear_task_event() {
        document.querySelector("a.clear-pending-tasks").addEventListener("click", (e) => {
            e.preventDefault()
            document.querySelector("ul.task-list").innerHTML = "";
            task_list.update_task_counts();
        });


        document.querySelector("a.clear-compl-tasks").addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector("ul.completed-tasks-list").innerHTML = "";
            task_list.update_task_counts();
        });
    }

}

// do the following on dom load -------------------

let li_els = document.querySelectorAll("div.task-container li");

for (let li_el of li_els) {
    listener_cl.register_li_mouse_events(li_el);
}
listener_cl.register_btns_remove_from_task_list();
listener_cl.register_btn_add_to_task();
listener_cl.register_inp_add_to_task();
listener_cl.register_a_clear_task_event();

