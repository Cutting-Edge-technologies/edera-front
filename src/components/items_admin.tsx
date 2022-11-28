import React from "react";
import { IHaveToken } from "../shared/typings";

interface IItemsManageProps extends IHaveToken {
    items: any[];
    fields: any[];
    desc: any;
}

interface IItemsManageState {
    items: any[];
    edit_item: number;
}

export class ItemsManage extends React.Component<IItemsManageProps, IItemsManageState> {
    constructor(props: IItemsManageProps) {
        super(props);
        this.state = {
            items: this.props.items,
            edit_item: -1,
        };
    }

    edit_item(index: number){
		console.log("edit_item", index, this.state.edit_item);
        var formData = new FormData(document.getElementById("edit_item") as HTMLFormElement);
        formData.append("csrfmiddlewaretoken", this.props.token);
        formData.append("edit_item", `${this.state.edit_item}`);
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


	item_form(item: any, index: number){
        return (
		<form id="edit_item">
			<div className="row">
				{this.props.fields.map((f, ind)=>
				<div className="col-lg-6 col-md-12 mb-3">
					<label className="form-label">{f.label}</label>
				    <input type={f.typ} name={f.name} className="form-control form-control-lg" defaultValue={item[f.name]}/>
				</div>)}
			</div>
			<div className="row">
				<div className="col-md-3 col-6">
					<button type="button" onClick={()=>this.edit_item(index)} className="btn btn-success btn-lg">
					Save</button></div>
				<div className="col-md-3 col-6">
					<button type="button" onClick={()=>this.setState({edit_item:-1})} className="btn btn-secondary btn-lg">
					Cancel</button>
				</div>
			</div>
		</form>
        )
	}
    render() {
        // this.items = this.state.items.slice();
        // this.items.push({id:0, name:'', account_id:'', client_id:'', client_secret:''});

        const items = [...this.state.items, {id:0, name:'', account_id:'', client_id:'', client_secret:''}]

        return (
            <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>{this.props.desc.name}</h2>
                    {items.map((item, index) =>

                        <div
                            className={item.id === this.state.edit_item ? "element-card selected" : "element-card"}
                            onClick={() => item.id !== this.state.edit_item ? this.setState({edit_item: item.id}):""}>
                            {item.id === this.state.edit_item ?
                                this.item_form(item, index)
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