import React from "react";
import {IItemsManageProps, IItemsManageState } from "./pair_info"

export class ItemsManage extends React.Component <IItemsManageProps, IItemsManageState> {
  constructor(props: IItemsManageProps) {
    super(props);
    this.state = {
      items: this.props.items,
      edit_item: -1,
    };
  }

  edit_item(index:number){
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

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Zoom аккаунты</h2>
            {this.props.items.map((item, index) =>
              <div
                className={item.id === this.state.edit_item ? "element-card selected" : "element-card"}
                onClick={() => item.id !== this.state.edit_item ? this.setState({edit_item: item.id}):""}
              >
                {item.id === this.state.edit_item ?
                  <form id="edit_item">
                    <div className="row">                 
			  						  <div className="col-lg-3 col-md-6 mb-3">
			  							  <label className="form-label">Название</label>
                        <input type="text" name="name" className="form-control form-control-lg" defaultValue={item.name}/>
                      </div>
                      <div className="col-lg-3 col-md-6 mb-3">
			  						    <label  className="form-label">Account_id</label>
                        <input type="text" name="account_id" className="form-control form-control-lg" defaultValue={item.account_id}
                        />
                      </div>
			  						  <div className="col-lg-3 col-md-6 mb-3">
			  						    <label className="form-label">Client_id</label>
                        <input type="text" name="client_id" className="form-control form-control-lg" defaultValue={item.client_id}
                        />
                      </div>
			  						  <div className="col-lg-3 col-md-6 mb-3">
			  						    <label className="form-label">Client_secret</label>
                        <input type="text" name="client_secret" className="form-control form-control-lg" defaultValue={item.client_secret}
                        />
                      </div>
                      <div className="col-md-3 col-6">
                        <button type="button" onClick={()=>this.edit_item(index)} className="btn btn-success btn-lg">
                          Сохранить
                        </button>
                      </div>
                      <div className="col-md-3 col-6">
                        <button type="button" onClick={()=>this.setState({edit_item:-1})} className="btn btn-secondary btn-lg">
                          Отмена
                        </button>
                      </div>
                    </div>
                  </form>
                  :<div>{item.id===0 ? <span>Добавить</span> :
                                      <span>{item.name}</span>
                  }</div>
                }
              </div>)
            }
          </div>
        </div>
      </div>
        )
    }
}