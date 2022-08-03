import { ApiLogin } from "../../services/api";

interface ReqQueryProps {
  body: any;
  query: {
    USERNAME: any;
    PASSWORD: any;
  };
}

interface ResProps {
  status: (arg0: number) => {
    (): any;
    new(): any;
    send: {
      (arg0: string): void;
      new(): any;
    };
  };
}

export default async function Login(req: ReqQueryProps, res: ResProps) {
  try {
    const response = await ApiLogin.post(
      "",
      {
        username: req.body.username,
        password: req.body.password,
      }
    );

    res.status(response.status).send(response.data);
  } catch (err) {
    console.error(err);
    res.status(400).send('Erro ao Realizar Login');
  }
}