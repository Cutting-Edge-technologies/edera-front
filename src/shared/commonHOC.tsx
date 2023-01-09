import React from "react";

export abstract class CommonHOC<Props, State> extends React.Component<{}, State>{
  constructor(parameters:Props) {
    super({});
  }

  abstract fethInitialData: ()=> Promise<Props>;

  protected initialData: Props | undefined = undefined;

  componentDidMount(): void {
    this.fethInitialData().then((initialData)=> this.initialData = initialData);
  }
}


export const hostName = "http://127.0.0.1:8000/";

export abstract class  CommonHOCWrapper<Props> extends React.Component<any, Props | {}>{
  abstract fetchInitialProps: ()=> Promise<Props>;
  public abstract RenderComponent: typeof React.Component<Props, any>;

  constructor(parameters: Props) {
    super(parameters);
    this.state = {};
  }

  componentDidMount(): void {
    this.fetchInitialProps()
    .then((initialData)=> {
      this.setState(initialData)
    });
  }

  abstract correspondingUrl: string;
  
  render() {
    const Component = this.RenderComponent as any;
    const haveRecievedInitialData = !!Object.keys(this.state).length;

    console.log(this.state);

    return haveRecievedInitialData ? (
      <Component {...this.state} />
    ) : (<></>)
  }
}
