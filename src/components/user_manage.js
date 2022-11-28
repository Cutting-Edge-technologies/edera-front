class LessonEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state={add_lesson:this.props.add_lesson,
                    services:this.props.services,
                    responsibles:this.props.responsibles,
                    zooms:[], timezones:[]
        }
    

        this.times = [];
        this.hours = [];
        this.minutes = [];
        let i;
        for(i=0;i<60;i+=5){
            this.minutes = this.minutes.concat(i.toString());
        }

        for(i=0;i<24;i++) {
            var ist = i.toString();
            this.hours = this.hours.concat(i.toString());
        }
        console.log(this.state.chats);
    }

    get_zooms(){
        var formData = new FormData(document.getElementById("add_lesson"));
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("action", "get_zooms");
        fetch(this.props.manage_url, {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
            console.log("get_zooms", resp);
            this.setState({zooms:resp.items})
            });
    }

    get_timezones(){
        var formData = new FormData();
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("action", "get_timezones");
        fetch(this.props.manage_url, {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
            console.log("get_timezones", resp);
            this.setState({timezones:resp.items})
            });
    }

    componentDidMount(){
        console.log("lesson editor", this.state.add_lesson)
        this.get_zooms();
        this.get_timezones();
    }

    do_add_lesson(copy=0){
        var formData = new FormData(document.getElementById("add_lesson"));
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("pair_id", this.state.add_lesson.pair_id);
        
        if(copy==0){
        if(this.state.add_lesson.id){
            formData.append("lesson_id", this.state.add_lesson.id);
        }}
        
        formData.append("add_lesson", 1);
        fetch(this.props.manage_url, {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
                this.props.save_lesson(resp);
                //this.setState({add_lesson:{pair_id:this.state.add_lesson.pair_id, info:resp.info, old_info: this.state.add_lesson.old_info}});
                //this.get_zooms();
        })
    }

    

    change_break(v){
        console.log(v);
        var lesson = this.state.add_lesson;
        lesson.break_duration = v;
        console.log(lesson);
        this.setState({add_lesson:lesson});
    }

    change_lesson(field, value){
        var add_lesson=this.state.add_lesson;
        add_lesson[field]=value;
        this.setState({add_lesson: add_lesson});
    }

    render(){
        this.zooms = this.state.zooms.slice();
        this.zooms.push({"id":0, "name":"Без Zoom"});
        console.log("render zooms", this.zooms);
        return (
            <div>
                <form id="add_lesson">
                    <div><h3>Урок {" "}
                         {this.state.add_lesson.id>0 ? this.state.add_lesson.id : "Новый"},
                         {" "} пара {this.state.add_lesson.pair_id>0 ? this.state.add_lesson.pair_id : " Empty"}
                         </h3></div>
                    <div className="form-group row my-1">
                        <div className="col-md-4 col-sm-5 col-12 mb-3">
                            <label>Дата</label>
                    <input className="form-control form-control-lg mx-1" name="date" type="date"
                           value={this.state.add_lesson.date ? this.state.add_lesson.date : this.props.today}
                    onChange={(e)=>this.change_lesson("date", e.target.value)}
                    /></div>
                        <div className="col-md-2 col-sm-2 col-3 mb-3">
                            <label>Начало (часы)</label>
                            <select className="form-control form-control-lg mx-1" name="start_hour"
                                    value={this.state.add_lesson.start_hour?this.state.add_lesson.start_hour:"9"}
                            onChange={(e)=>this.change_lesson("start_hour", e.target.value)}>
                                {this.hours.map((value, index)=>
                                <option value={value}>{value}</option>)}</select></div>
                        <div className="col-md-2 col-sm-2 col-3 mb-3">
                            <label>(минуты)</label>
                            <select name="start_minute" className="form-control form-control-lg mx-1"
                            value={this.state.add_lesson.start_minute?this.state.add_lesson.start_minute:"0"}
                            onChange={(e)=>this.change_lesson("start_minute", e.target.value)}>
                                {this.minutes.map((value, index)=>
                                <option value={value}>{value} минут</option>)}
                            </select>
                        </div>
                        <div className="col-md-2 col-sm-2 col-3  mb-3">
                            <label>Длительность (часы)</label>
                            <select name="hours" className="form-control form-control-lg mx-1"
                            value={this.state.add_lesson.hours?this.state.add_lesson.hours:""}
                            onChange={(e)=>this.change_lesson("hours", e.target.value)}>
                                <option value="0">0</option>
                                <option value="1">1 час</option>
                                <option value="2">2 часа</option>
                                <option value="3">3 часа</option>
                                <option value="4">4 часа</option>
                            </select></div>
                            <div className="col-md-2 col-sm-2 col-3 mb-3">
                            <label>(минуты)</label>
                                <select name="minutes" className="form-control form-control-lg mx-1"
                            value={this.state.add_lesson.minutes?this.state.add_lesson.minutes:""}
                            onChange={(e)=>this.change_lesson("minutes", e.target.value)}>
                                {this.minutes.map((value, index)=>
                                <option value={value}>{value} минут</option>)}
                            </select>
                            </div>

                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <input name="name" className="form-control form-control-lg mx-1"
                                   placeholder="Mathematics"
                                   onChange={(e)=>this.change_lesson("name", e.target.value)}
                                   value={this.state.add_lesson.name?this.state.add_lesson.name:""}/>
                        </div>
                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <select name="service" className="form-control form-control-lg mx-1"
                                    onChange={(e)=>this.change_lesson("service", e.target.value)}
                                    value={this.state.add_lesson.service}>
                                {this.state.services.map((s, index)=>
                                <option value={s.note_id}>{s.name}, ({s.cost}, {s.earn})</option>
                                )}
                            </select>
                        </div>
                        <div className="col-md-4 col-sm-6 col-6 mb-3">
                            <select name="repeat" className="form-control form-control-lg mx-1"
                                    onChange={(e)=>this.change_lesson("repeat", e.target.value)}
                                    value={this.state.add_lesson.repeat?this.state.add_lesson.repeat:"0"}>
                                <option value="0">Одноразовый</option>
                                <option value="1">1 week</option>
                                <option value="2">2 week</option>
                                <option value="4">4 week</option>
                                <option value="30">1 month</option>
                            </select>
                        </div>

                        <div className="col-md-2 col-sm-6 col-6 mb-3">
                            <button type="button" className="btn btn-lg btn-success"
                            onClick={()=>this.do_add_lesson()}>{this.state.add_lesson.id ?"Сохранить":"Добавить урок"}</button>
                        </div>
                        
                        <div className="col-md-2 col-sm-6 col-6 mb-3">
                        {this.state.add_lesson.id > 0 ?
                            <button type="button" className="btn btn-lg btn-info"
                            onClick={()=>this.do_add_lesson(1)}>Копировать</button>:
                            ""}
                        </div>


                        <div className="col-md-4 col-sm-6 col-12 col-mb-3">
                            <select name="tz" className="form-control form-control-lg mx-1"
                                    value={this.state.add_lesson.tz}
                                    onChange={(e)=>this.change_lesson("tz", e.target.value)}>
                                {this.state.timezones.map((item, index)=>
                                <option value={item.id}>{item.hours} - {item.name}</option>
                                )}
                            </select>
                        </div>

                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <select name="break_duration" className="form-control form-control-lg mx-1"
                                    value={this.state.add_lesson.break_duration}
                                    onChange={(e)=>this.change_lesson("break_duration", e.target.value)}>
                                <option value="0">Без перерыва</option>
                                <option value="10">10 мин</option>
                                <option value="20">20 мин</option>
                                <option value="30">30 мин</option>
                                <option value="45">45 мин</option>
                                <option value="60">60 мин</option>
                            </select>
                        </div>
                        {this.state.add_lesson.break_duration ?
                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <select name="break_start" className="form-control form-control-lg mx-1"
                                    onChange={(e)=>this.change_lesson("break_start", e.target.value)}
                                    value={this.state.add_lesson.break_start}>
                                <option value="30">Через 30 мин</option>
                                <option value="45">Через 45 мин</option>
                                <option value="60">Через 1 час</option>
                                <option value="75">Через 1 час 15 мин</option>
                                <option value="90">Через 1.5 часа</option>
                            </select>
                        </div> : ""}
                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <select name="responsible" className="form-control form-control-lg mx-1"
                                    onChange={(e)=>this.change_lesson("responsible", e.target.value)}
                                    value={this.state.add_lesson.responsible?this.state.add_lesson.responsible:"A, E"}>
                        {this.props.responsibles.map((value, index)=>
                            <option value={value}>{value}</option>)}</select></div>
                        {this.state.add_lesson.id?
                         <div className="col-md-4 col-sm-4 col-6  mb-3">
                             <label>Себестоимость (минуты), -1 значит как занятие</label>
                        <input name="duration_cost" type="number" className="form-control form-control-lg mx-1"
                                onChange={(e)=>this.change_lesson("duration_cost", e.target.value)}
                                value={this.state.add_lesson.duration_cost}>
                        </input></div>:""}

                        <div className="col-md-4 col-sm-6 col-12 mb-3">
                            <div className="input-group mx-1">
                            <button type="button" class="btn btn-outline-secondary" onClick={()=>this.get_zooms()}><i className="fa fa-refresh"></i></button>
                            <select name="zoom" className="form-control form-control-lg"
                                    onChange={(e)=>this.change_lesson("zoom", e.target.value)}
                                    value={this.state.add_lesson.zoom?this.state.add_lesson.zoom:"0"}>
                                        
                                        {this.zooms.map((item, index)=>
                                            <option value={item.id}>{item.name}</option>
                                        
                                        )
                                        }
                            </select>
                            </div>
                    
                        </div>
                        

                    </div>
                </form>

            </div>
        )
    }


}

class AddUser extends React.Component{
    constructor(props) {
        super(props);
        this.state={childKey:0,
                    users:this.props.users,
                    pairs:this.props.pairs,
                    chats:this.props.chats,
                    services:this.props.services,
                    add_user:{modal:false, user_id:0},
                    add_pair:{student:0, teacher:0},
                    add_chat:{pair:{id:0}, chat:{id:0}},
                    add_lesson:{pair_id:0, date:0},
                    user_id:this.props.users ? this.props.users[0].user_id : 0,
                    user_tg:this.props.users ? this.props.users[0].tg : 0,
        };

        this.save_lesson=this.save_lesson.bind(this);
        this.cancel_lesson = this.cancel_lesson.bind(this);
        this.edit_lesson= this.edit_lesson.bind(this);
        console.log(this.state.chats);
    }


    add_user(role="student"){
        var name = prompt("Please enter " + role + " name", "Mark Ivanov");
        if(name!=null){
            var formData = new FormData();
            formData.append("csrfmiddlewaretoken", this.props.token);
            formData.append("name", name);
            formData.append("role", role);
            formData.append("add_user", 1);
            fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
                var users = this.state.users.slice();
                users.push(resp.user)
                this.setState({users:users})
                });
        }
    }

    add_pair(){
        console.log(this.state.add_pair);
        var formData = new FormData();
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("user_id", this.state.add_pair.student);
        formData.append("teacher", this.state.add_pair.teacher);
        formData.append("add_pair", 1);
        fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp)
                var pairs = this.state.pairs.slice()
                if(resp.ok){pairs.push(resp.pair);}
                this.setState({add_pair:{student:0, teacher:0}, pairs:pairs});
            });
    }

    add_chat(){
        console.log(this.state.add_chat);
        var formData = new FormData();
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("pair_id", this.state.add_chat.pair.id);
        formData.append("chat_id", this.state.add_chat.chat.id);
        formData.append("add_chat", 1);
        fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
                if (resp.ok) {
                    var pairs = this.state.pairs.slice();
                    var pair_id = this.state.add_chat.pair.id
                    var index = pairs.findIndex(function(el){return el.pair_id===pair_id})
                    pairs[index]= resp.chat_id;
                    var chats = this.state.chats.slice();
                    chats.splice(this.state.add_chat.chat.index, 1)
                    this.setState({add_chat: {pair: {id: 0}, chat: {id: 0}}, pairs: pairs, chats: chats});
                }
            }
        )
    }

    pair_id_info(pair_id){
        var formData = new FormData();
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("pair_id_info", pair_id);
        fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
                this.setState({childKey:this.state.childKey+1, add_lesson:{pair_id:0, info:[], old_info:[]}});
                this.setState({add_lesson:{pair_id:pair_id, id:0, info:resp.info, old_info:resp.old_info}})})
    }
    

    save_lesson(resp){
        let pair_id = this.state.add_lesson.pair_id;
        this.setState({childKey:this.state.childKey+1, add_lesson:{pair_id:0, info:[], old_info:[]}});
        this.setState({add_lesson:{pair_id:pair_id, id:0, info:resp.info,
             old_info: this.state.add_lesson.old_info}, childKey:this.state.childKey+1});
    }

    edit_lesson(lesson){
        lesson.pair_id = this.state.add_lesson.pair_id;
        lesson.info = this.state.add_lesson.info;
        lesson.old_info = this.state.add_lesson.old_info;
        //this.setState({add_lesson:{pair_id:0, date:0}});
        //console.log(lesson);
        this.setState({childKey:this.state.childKey+1});
        this.setState({add_lesson:lesson});
    }

    edit_pair(v, pair_id, index){
        console.log(v, pair_id);
        var formData = new FormData()
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("edit_pair",pair_id);
        formData.append("send_timetable",v ? 1 : 0);
        fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
                var pairs = this.state.pairs.slice();
                pairs[index] = resp.pair;
                this.setState({pairs:pairs});
        })
    }
    cancel_lesson(lesson_id, single=0){
        var msg;
        if(single){
            msg = "Этот урок будет одноразово отменен, но если включено повторение, следующие останутся.\n"
        }
        else{msg = "Урок и его повторы будeт удалены.\n"}
        var confirm = prompt(msg + "Для подтверждения введите: yes", "no")
        if(confirm=== "yes"){
            var formData = new FormData();
            formData.append("csrfmiddlewaretoken", this.props.token);
            formData.append("cancel_lesson", lesson_id);
            formData.append("single", single);
            fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                    console.log(resp);
                    this.setState({add_lesson:{pair_id:this.state.add_lesson.pair_id, info:resp.info, old_info: this.state.add_lesson.old_info}})
            });
        }
    }

    send_notification(lesson_id){
        var confirm = prompt("Для подтверждения введите: yes", "no")
        if(confirm=== "yes"){
            var formData = new FormData();
            formData.append("csrfmiddlewaretoken", this.props.token);
            formData.append("notification", lesson_id);
            fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                    console.log(resp);
                    this.setState({add_lesson:{pair_id:this.state.add_lesson.pair_id, info:resp.info, old_info: this.state.add_lesson.old_info}})
            });
        }
    }

    delete_user(user_id){
        var confirm = prompt("Для подтверждения введите: yes", "no")
        if(confirm=== "yes"){
            var formData = new FormData()
            formData.append("csrfmiddlewaretoken", this.props.token);
            formData.append("delete_user", user_id);
            fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                    console.log(resp);
                    this.setState({users:resp.users});
            });
        }
    }

    delete_pair(pair_id){
        var confirm = prompt("Для подтверждения введите: yes", "no")
        if(confirm=== "yes"){
            var formData = new FormData()
            formData.append("csrfmiddlewaretoken", this.props.token);
            formData.append("delete_pair", pair_id);
            fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                    console.log(resp);
                    this.setState({pairs:resp.pairs, add_lesson:{pair_id:0, date:0}});
            });
        }
    }

    change_lesson(field, value){
        var add_lesson=this.state.add_lesson;
        add_lesson[field]=value;
        this.setState({add_lesson: add_lesson});
    }

    get_timetable_text(source){
        var formData = new FormData();
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("user_id",this.state.user_id);
        formData.append("timetable_text", source);
        fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
            console.log(resp);
            this.setState({timetable_text:resp.text});
    });
    }

    choose_user(user_id){
        let tg = this.state.users.filter(function (user) {return user.user_id == user_id});
        
        if(tg.length>0){
            tg = tg.slice()[0].tg;
        }
        else{
            tg="";
        }
        this.setState({user_id:user_id, user_tg:tg, timetable_text:""})
    }

    render(){
       
    return (
        <div className="container">
            <h2>Добавить урок для пары учитель ученик</h2>

            <div className="row">
                <div className="col-md-6">
                <select className="form-control form-control-lg"
                onChange={(e)=>this.choose_user(e.target.value)}>
                {this.state.users.filter(function (user) {return user.role === "student"}).map((user, index)=>
                    <option value={user.user_id}>{user.name}</option>)
                }
                </select></div>
                <div className="col-md-6">
                    <h5>{this.state.user_tg ?<a href={"https://t.me/"+this.state.user_tg}>{this.state.user_tg}</a> :"Выберите ученика"} </h5>
                </div>
                <div className="col-md-12">
                    {this.state.user_id ?
                    <div class="btn-group my-1">
                    
                    <button  type="button" class="btn btn-info" onClick={(e)=>this.get_timetable_text("telegram")}>Telegram timetable</button>
                    <button  type="button" class="btn btn-success"  onClick={(e)=>this.get_timetable_text("whatsapp")}>Whats App timetable</button>
                    {this.state.timetable_text ? 
                    <button  type="button" class="btn btn-warning"  onClick={(e)=>this.setState({timetable_text:""})}>Close</button> : ""}
                    </div>:""
                    }
                    {this.state.timetable_text ? 
                    <div className="row">
                        <div className="col-md-6">
                            <h5>Студенту</h5>
                            <textarea value={this.state.timetable_text[0]} cols="50" rows="30"></textarea>
                        </div>
                        <div className="col-md-6">
                            <h5>Учителю</h5>
                            <textarea value={this.state.timetable_text[1]} cols="50" rows="30"></textarea>
                        </div>
                    </div>
                    :""}
        
                </div>
                    {this.state.pairs.map((pair, index)=>
                        this.state.user_id==pair.user_id?
                        <div className="col-md-3">
                        <div className={pair.pair_id===this.state.add_lesson.pair_id?"element-card selected":"element-card"}
                        onClick={()=>this.pair_id_info(pair.pair_id)}>{pair.name}
                            {pair.chat_id ? "": <span> &#10007;</span>}</div>

                            {this.state.add_lesson.pair_id===pair.pair_id ?
                            <div>
                                
                                {/*
                        <form id="pars">
                        
                        <div className="form-check form-switch">
                            <input name="send_timetable" className="form-check-input"
                                   type="checkbox" id="flexSwitchCheckDefault" defaultChecked={pair.send_timetable}
                            onChange={(e)=>this.edit_pair(e.target.checked, pair.pair_id, index)}/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Отправлять расписание?</label>
                        </div>
                    </form>*/}
                    </div>:""}
                        </div>:""
                    )}

            </div>
            <br/>
            {this.state.add_lesson.pair_id ?
            <div>
                <LessonEditor key={this.state.childKey} services={this.state.services}
                responsibles={this.props.responsibles}
                token={this.props.token}
                manage_url='/manage/'
                add_lesson={this.state.add_lesson}
                save_lesson={this.save_lesson}
                edit_lesson={this.edit_lesson}
                cancel_lesson={this.cancel_lesson}/>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr><th>Текст</th><th>Повтор</th><th>Уведомление<br/> отправлено</th><th>Timezone</th><th>Действие</th></tr>
                        </thead>
                        <tbody>
                        {this.state.add_lesson.info.map((el, index)=>
                        <tr><td>{el.start} - {el.end} {el.name} {el.break ? ", перерыв "+el.break :""}
                            {el.duration_cost>=0?
                                <div><br/><strong className={"text-danger"}>Себестоимость {el.duration_cost} мин</strong>
                                    </div>:""}</td>
                            <td>{el.repeat!="0" ? <span> {el.repeat!="30" ? el.repeat+'w' : '1m'}</span> : ""}</td>
                            
                            <td>{el.notification ? <div className={"click"}> <span onClick={()=>this.send_notification(el.id)}
                                                                className="text-secondary">ReSend</span></div> :
                                <div className={"click"}> <span onClick={()=>this.send_notification(el.id)}
                                                                className="text-primary">Send</span></div>}</td>
                            <td>{el.tz_name}</td>
                            <td >
                                <strong className="click-block">
                                    <div className="click" onClick={()=>this.edit_lesson(el)}><i className="fa fa-edit text-primary fa-lg"/></div> &nbsp;
                                    <div className="click" onClick={()=>this.cancel_lesson(el.id)}><i className="fa fa-trash text-danger fa-lg"/></div> &nbsp;
                            {el.repeat==="1"?<div className="click" onClick={()=>this.cancel_lesson(el.id, 1)}><i className="fa fa-power-off text-danger fa-lg"/></div>:""}</strong></td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                    <button type="button" onClick={()=>this.delete_pair(this.state.add_lesson.pair_id)} className="btn btn-outline-danger">Расформировать пару</button><br/>
                    <strong>Текст для копирования</strong>
                    {this.state.add_lesson.old_info.map((el, index)=>
                        <p className="text-success">{el.start} - {el.end} {el.name} ({el.teacher}) </p>)}
                    {this.state.add_lesson.info.map((el, index)=>
                        <p>{el.start} - {el.end} {el.name} ({el.teacher}) </p>)}
                </div>
            </div>:<p>Выберите пару ученик-учитель</p>
            }
            <br/>
            <hr/>
            <div className="row">
                <div className="col-md-6">
                    <h2>Ученики</h2>
                    {this.state.add_pair.student ? <button type="button" onClick={()=>this.delete_user(this.state.add_pair.student)} className="btn btn-outline-danger">
                        Удалить ученика</button>:""}
                     {this.state.users.filter(function (user) {return user.role === "student"}).map((user, index)=>
                     <div className={user.user_id===this.state.add_pair.student?"element-card selected":"element-card"}
                          onClick={()=>this.setState({add_pair:{student:user.user_id, teacher:this.state.add_pair.teacher}})}>{user.name}</div>)
                     }
                     <div className="element-card" onClick={()=>this.add_user("student")}><span className="text-success">Добавить ученика</span></div>
                </div>
                <div className="col-md-6">
                    <h2>Учителя</h2>
                    {this.state.add_pair.teacher ? <button type="button" onClick={()=>this.delete_user(this.state.add_pair.teacher)} className="btn btn-outline-danger">
                        Удалить учителя</button>:""}
                    {this.state.users.filter(function (user) {return user.role === "teacher"}).map((user, index)=>
                     <div className={user.user_id===this.state.add_pair.teacher?"element-card selected":"element-card"}
                          onClick={()=>this.setState({add_pair:{student:this.state.add_pair.student, teacher:user.user_id}})}>{user.name}</div>)
                     }
                     <div className="element-card" onClick={()=>this.add_user("teacher")}><span className="text-success">Добавить учителя</span></div>
                </div>
            </div>
            <div>
                <p>Чтобы добавить пару выберите ученика из левой колонки, учитель из правой и нажмите создать пару.</p>
                <button type="button" className="btn btn-success" onClick={()=>this.add_pair()}
                        disabled={!this.state.add_pair.student || !this.state.add_pair.teacher}>Создать пару ученик-учитель</button>
            </div>
                <br/>
            <hr/>
            <div className="row">
                <div className="col-md-6">
                   <h2>Пары учитель-ученик без чата</h2>
                    {this.state.pairs.filter(function (pair) {return pair.chat_id === 0}).map((pair, index)=>
                        <div className={pair.pair_id===this.state.add_chat.pair.id?"element-card selected":"element-card"}
                        onClick={()=>this.setState({add_chat:{pair:{id:pair.pair_id, index:index}, chat:this.state.add_chat.chat}})}>{pair.name}</div>
                    )}
                </div>
                <div className="col-md-6">
                   <h2>Чаты с ботом без пары</h2>
                    {this.state.chats.map((chat, index)=>
                        <div className={chat.chat_id===this.state.add_chat.chat.id?"element-card selected":"element-card"}
                        onClick={()=>this.setState({add_chat:{pair:this.state.add_chat.pair, chat:{id:chat.chat_id, index:index}}})}><span>{chat.text} ({chat.date})</span><br/><small>{chat.chat_id}</small></div>
                    )}
                    <p>Чтобы добавить групповой чат:<br/>
                    <ul><li>Добавьте @Edera_bot в групповой чат</li>
                        <li>Дайте боту права администратора</li>
                        <li>Напишите любое сообщение в чат</li>
                        <li>Обновите страницу, чат появится здесь</li>
                    </ul>
                    </p>
                    <ul>
                    <li>
                    <a href="/clear" target="_blank">Почистить кеш (если не видно новых чатов)</a></li>
                    <li><a href="/tg" target="_blank">Все чаты</a></li>
                    </ul>
                </div>
            </div>
            <button type="button" className="btn btn-success" onClick={()=>this.add_chat()}
            disabled={!this.state.add_chat.pair.id || !this.state.add_chat.chat.id}
            >Связать пару и чат</button>
            <br/>
            <hr/>

        </div>
    )
    }
}
