import React from "react";
import { IHaveToken } from "../shared/typings";

export interface IItemsManageProps extends IHaveToken {
    items: IItem[];
    fields: IField[];
    desc: {name:string};
}

export interface IItemsManageState {
    items: IItem[];
    edit_item: number;
}

export interface IItem {
  id: number;
  name: string;
}

export interface IField {
  label: string;
  name: string;
  typ: React.HTMLInputTypeAttribute | undefined;
}
export interface IItemFormProps {
  item: IItem;
  fields: IField[];
  onSave: () => any;
  onCancel: () => any;
}

export const ItemForm: React.FC<IItemFormProps> = ({item, fields, onSave, onCancel}) => {
  return (
    <form id="edit_item">
      <div className="row">
        {fields.map((field, ind)=>
        <div className="col-lg-6 col-md-12 mb-3">
          <label className="form-label">{field.label}</label>
            <input
              type={field.typ}
              name={field.name}
              className="form-control form-control-lg"
              // defaultValue={item[f.name]}
            />
        </div>)}
      </div>
      <div className="row">
        <div className="col-md-3 col-6">
          <button type="button" onClick={onSave} className="btn btn-success btn-lg">Save</button>
        </div>
        <div className="col-md-3 col-6">
          <button type="button" onClick={onCancel} className="btn btn-secondary btn-lg">Cancel</button>
        </div>
      </div>
    </form>
  )
}

export interface IHaveItem {
  item: IItem;
}

export const AddItemName: React.FC<IHaveItem> = ({item}) => {
  const hasNoId = item.id===0;
  return (
    <div>
      { hasNoId ? <span>Добавить</span> : <span>{item.name}</span>}
    </div>
  );
}

export class ItemsManage extends React.Component<IItemsManageProps, IItemsManageState> {
    constructor(props: IItemsManageProps) {
        super(props);
        this.state = {
            items: this.props.items,
            edit_item: -1,
        };
    }

    get formData(): FormData {
      const formData = new FormData(document.getElementById("edit_item") as HTMLFormElement);
      formData.append("csrfmiddlewaretoken", this.props.token);
      formData.append("edit_item", `${this.state.edit_item}`);
      return formData;
    }

    async makeCreateSomethingApiRequest(data: FormData) {

      const responce = await fetch("", {method: "POST", body: data});
      const responceData = await responce.json();

      return responceData;
    }

    async edit_item(index: number){
		  console.log("edit_item", index, this.state.edit_item);

      const formData = this.formData;
      const responce = await this.makeCreateSomethingApiRequest(formData);

      const isItemEdited = this.state.edit_item === 0;
      const items = this.state.items.slice();
      if(isItemEdited){
        items.push(responce.item)
      }
      else {
        items[index] = responce.item;
      }
      this.setState({edit_item:-1, items});
    };

    render() {

      const itemsIncludedEmptyElement = [...this.state.items, {id:0, name:'', account_id:'', client_id:'', client_secret:''}];

      return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>
                {this.props.desc.name}
              </h2>
              {
                itemsIncludedEmptyElement.map((item, index) => {
                  const isEditing = item.id === this.state.edit_item;
                  const onSave = ()=>this.edit_item(index);
                  const onCancel = ()=>this.setState({edit_item:-1})
                  return (
                    <div
                      className={isEditing ? "element-card selected" : "element-card"}
                      onClick={() =>this.setState({edit_item: item.id})}
                    >
                      {isEditing ? <ItemForm item={item} fields={this.props.fields} onSave={onSave} onCancel={onCancel} /> : <AddItemName item={item} />}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      )
    }
}
