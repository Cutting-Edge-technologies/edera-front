class ItemsManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items,
            edit_item: -1,
        };
    }

	/*add_item(){
		console.log("add_item");
		let items = this.state.items.slice();
		items.push({id:0, name:'', account_id:'', client_id:'', client_secret:''});
		this.setState({items:items, edit_item:items.length()-1});
	}*/

    edit_item(index){
		console.log("edit_item", index, this.state.edit_item);
        var formData = new FormData(document.getElementById("edit_item"));
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("edit_item", this.state.edit_item);
        fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
                var items = this.state.items.slice();
                if(this.state.edit_item===0){
                    items.push(resp.item)
                }
                else {
                    items[index] = resp.item;
                }
                this.setState({edit_item:-1, items:items})
                });
    }


    render() {
        this.items = this.state.items.slice();
        this.items.push({id:0, name:'', hours:3});
        return (
            <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Тайм-зоны</h2>
                    {this.items.map((item, index) =>

                        <div
                            className={item.id === this.state.edit_item ? "element-card selected" : "element-card"}
                            onClick={() => item.id !== this.state.edit_item ? this.setState({edit_item: item.id}):""}>
                            {item.id === this.state.edit_item ?
                                <form id="edit_item">
                                <div className="row">
                                    
                                    
									<div className="col-lg-4 col-md-6 mb-3">
										<label className="form-label">Название</label>
                                    <input type="text" name="name" className="form-control form-control-lg" defaultValue={item.name}/>
                                    </div>
                                    <div className="col-lg-4 col-md-6 mb-3">
									<label className="form-label">Часы от +00 (если Москва, то 3)</label>
                                    <input type="number" name="hours" className="form-control form-control-lg"
                                     defaultValue={item.hours}
                                   />
                                    </div>
                                    </div>
									
                                    <div className="row">
                                    <div className="col-md-3 col-6">
                                    <button type="button" onClick={()=>this.edit_item(index)} className="btn btn-success btn-lg">
                                        Сохранить</button></div>
                                    <div className="col-md-3 col-6">
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