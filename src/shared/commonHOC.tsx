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

export type CommandPropsMap = { [key: string]: (...args: any[]) => void };

export abstract class  CommonHOCWrapper<DataProps, CommandProps extends CommandPropsMap> extends React.Component<any, DataProps | {}>{
  abstract fethInitialProps: ()=> Promise<DataProps>;
  public abstract RenderComponent: typeof React.Component<DataProps, any>;

  constructor() {
    super({});
    this.state = undefined as DataProps;
  }

  componentDidMount(): void {
    this.fethInitialProps()
    .then((initialData)=> {
      this.setState(initialData)
    });
  }

  abstract correspondingUrl: string;

  abstract commandProps: CommandProps;
  
  render() {
    const Component = this.RenderComponent;
    const haveRecievedInitialData = !!Object.keys(this.state).length;

    return haveRecievedInitialData ? (
      <Component {...this.state as any} />
    ) : (<></>)
  }
}