class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.services,
            edit_user: -1,
            family:0
        };
    }

    edit_user(index){
        var formData = new FormData(document.getElementById("edit_user"));
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("edit_user", this.state.edit_user);
        fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
                var users = this.state.users.slice();
                if(this.state.edit_user===0){
                    users.push(resp.user)
                }
                else {
                    users[index] = resp.user;
                }
                this.setState({edit_user:-1, users:users})
                });
    }

    group_select(service_id){
		let all_services= this.props.all_dicts.groups.slice()
		all_services.push({id:0, name:"Not chosen"})
		console.log(all_services);
		return (<select name="group" className = "form-control form-control-lg" defaultValue={service_id}>
				{all_services.map((item, index) => 
				<option value = {item.id}> {item.name}</option>)}|
			</select>
		)
	}

    render() {
        this.services = this.state.users.slice();
        this.services.push({"note_id":0, name:"", cost:2001, earn:1001, group:{id:0, name: "Not chosen"}});
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>Сервисы</h2>
                    {this.services.map((user, index) =>

                        <div
                            className={user.note_id === this.state.edit_user ? "element-card selected" : "element-card"}
                            onClick={() => user.note_id !== this.state.edit_user ? this.setState({edit_user: user.note_id}):""}>
                            {user.note_id === this.state.edit_user ?
                                <form id="edit_user">
                                <div className="row">
                                    <div className="col-md-6 mb-3">Себестоимость</div>
                                    <div className="col-md-6 mb-3">Выручка</div>
                                    <div className="col-md-6 mb-3">
                                    <input type="number" name="cost" className="form-control form-control-lg" defaultValue={user.cost}/>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                    <input type="number" name="earn" className="form-control form-control-lg" defaultValue={user.earn}
                                   />
                                    </div>
                                </div>
                                <div className="row">
                                    
                                    <div className="col-md-6 mb-3">
                                        <label>Name</label>
                                        <input name="name" className="form-control form-control-lg" defaultValue={user.name}/>
                                    </div>
                                    
                                    <div className="col-md-6 mb-3">
                                        <label>Service group</label>
                                        {this.group_select(user.group.id)}
                                    </div>
                                    
                                </div>
                                <div className="row">
                                    <div className="col-6 my-1">
                                    <button type="button" onClick={()=>this.edit_user(index)} className="btn btn-success btn-lg">
                                        Save</button></div>
                                    <div className="col-6 my-1">
                                    <button type="button" onClick={()=>this.setState({edit_user:-1})} className="btn btn-secondary btn-lg">
                                        Cancel</button></div>
                                </div></form>
                                :<div>{user.note_id===0 ? <span>Добавить</span> :
                                    <span>{user.name} - {user.group.name} ({user.cost}, {user.earn})</span>}</div>}
                        </div>)
                    }
                 </div>

            </div>
            </div>
        )
    }
}