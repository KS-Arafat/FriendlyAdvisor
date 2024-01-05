const config = {
	api: {
		bodyParser: {
			sizeLimit: "1mb",
		},
	},
};
const middleware = async (req: Request, res: Response) => {};

export { config, middleware };
