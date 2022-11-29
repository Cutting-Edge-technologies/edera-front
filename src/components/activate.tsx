import React from "react";
import { id, IHaveToken } from "../shared/typings";

export interface IUser {
    user_id: string;
    name: string;
}
interface IHaveUsersAndTeachers {
    users: IUser[];
    teachers: IUser[];
}

interface IUserInfoProps extends IHaveUsersAndTeachers, IHaveToken {
    token: string;
}

interface IUserInfoState extends IHaveUsersAndTeachers {
    edit_user: number;
}

export class UserInfo extends React.Component<IUserInfoProps, IUserInfoState> {
    constructor(props: IUserInfoProps) {
        super(props);
        this.state = {
            users: this.props.users,
            teachers: this.props.teachers,
            edit_user: 0,
        };
    }

    activate_user(user_id: id){
        var name = prompt("Do you want to activate user? To confirm type: \n yes", "no");
        if(name==="yes") {
            var formData = new FormData();
            formData.append("csrfmiddlewaretoken", this.props.token);
            formData.append("activate_user", user_id);
            fetch("", {method: "POST", body: formData}).then(response => response.json()).then((resp) => {
                console.log(resp);
                this.setState({teachers: resp.teachers, users: resp.users})
            });
        }
    }

    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h2>Ученики</h2>
                    {this.state.users.map((user, index) =>
                        <div
                            className= {"element-card"}
                            onClick={() => this.activate_user(user.user_id)}>
                            {user.name}
                        </div>)
                    }
                </div>
               <div className="col-md-4">
                    <h2>Учителя</h2>
                    {this.state.teachers.map((teacher, index) =>
                        <div
                            className= {"element-card"}
                            onClick={() => this.activate_user(teacher.user_id)}>
                            {teacher.name}
                        </div>)
                    }
                </div>
            </div>
            </div>
        )
    }
}