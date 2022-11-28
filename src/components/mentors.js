class ItemsManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
			managers:this.props.managers,
            edit_item: -1,
			xkey:"mentor",
			n:0
        };
    }

    edit_item(index, key="mentor"){
		console.log("edit_item", index, this.state.edit_item);
        var formData = new FormData(document.getElementById("edit_item"));
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("edit_item", this.state.edit_item);
		formData.append("key", key);
        fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
				if(key=="mentor"){
                	var items = this.state.items.slice();
				}
				else{
					var items = this.state.managers.slice();
				}

                if(this.state.edit_item===0){
                    items.push(resp.item)
                }
                else {
                    items[index] = resp.item;
                }

				if(key=="mentor"){
                	this.setState({edit_item:-1, items:items})
				}
				else{
					this.setState({edit_item:-1, managers:items})
				}
                });
    }


    render() {
        this.items = this.state.items.slice();
        this.items.push({id:0, name:'', tg:''});
		this.managers = this.state.managers.slice();
        this.managers.push({id:0, name:'', manager:0, tg:''});
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>Менторы</h2>
                    {this.items.map((item, index) =>
                        <div
                            className={item.id === this.state.edit_item  & this.state.xkey=="mentor" ? "element-card selected" : "element-card"}
                            onClick={() => item.id !== this.state.edit_item ? this.setState({n:this.state.n+1, edit_item: item.id, xkey:"mentor"}):""}>
                            {item.id === this.state.edit_item & this.state.xkey=="mentor"?
                                <form id="edit_item">
                                <div className="row">
                                    
                                    
									<div className="col-md-12 mb-3">
										<label className="form-label">Имя Фамилия</label>
                                    <input type="text" name="name" className="form-control form-control-lg" defaultValue={item.name}/>
                                    </div>
                                    <div className="col-md-12 mb-3">
										<label className="form-label">Telegram (без @)</label>
										<input type="text" name="tg" className="form-control form-control-lg"
										defaultValue={item.tg}/>
                                    </div>
                                    

									<div className="col-md-12 mb-3">
										<label className="form-label">Тьютор-менеджер</label>
										<select type="text" name="manager" className="form-control form-control-lg" 
										defaultValue={item.manager}>
										<option value="0">Не выбран</option>
										{this.state.managers.map((item, index)=>
											<option value={item.id}>{item.name}</option>
										)}
										</select>

                                    </div>
									</div>
                                    <div className="row">
                                    <div className="col-md-6 col-6">
                                    <button type="button" onClick={()=>this.edit_item(index, key="mentor")} className="btn btn-success btn-lg">
                                        Сохранить</button></div>
                                    <div className="col-md-6 col-6">
                                    <button type="button" onClick={()=>this.setState({edit_item:-1})} className="btn btn-secondary btn-lg">
                                        Отмена</button></div>
                                </div></form>
                                :<div>{item.id===0 ? <span>Добавить</span> :
                                    <span>{item.name}</span>}</div>}
                        </div>)
                    }
                 </div>
				
				 <div className="col-md-6">
                    <h2>Тьютор-менеджеры</h2>
                    {this.managers.map((item, index) =>
                        <div
                            className={item.id === this.state.edit_item  & this.state.xkey=="manager" ? "element-card selected" : "element-card"}
                            onClick={() => item.id !== this.state.edit_item ? this.setState({ n:this.state.n+1, edit_item: item.id, xkey:"manager" }):""}>
                            {item.id === this.state.edit_item & this.state.xkey=="manager" ?
                                <form id="edit_item">
                                <div className="row">
                                    
                                    
									<div className="col-md-12 mb-3">
										<label className="form-label">Имя Фамилия</label>
                                    <input type="text" name="name" className="form-control form-control-lg" defaultValue={item.name}/>
                                    </div>
                                    <div className="col-md-12 mb-3">
										<label className="form-label">Telegram (без @)</label>
										<input type="text" name="tg" className="form-control form-control-lg"
										defaultValue={item.tg}/>
                                    </div>
                                    </div>

									
                                    <div className="row">
                                    <div className="col-md-6 col-6">
                                    <button type="button" onClick={()=>this.edit_item(index, key="manager")} className="btn btn-success btn-lg">
                                        Сохранить</button></div>
                                    <div className="col-md-6 col-6">
                                    <button type="button" onClick={()=>this.setState({edit_item:-1})} className="btn btn-secondary btn-lg">
                                        Отмена</button></div>
                                </div></form>
                                :<div>{item.id===0 ? <span>Добавить</span> :
                                    <span>{item.name}</span>}</div>}
                        </div>)
                    }
                 </div>

            </div>
            </div>
        )
    }
}