import { redirect } from "next/navigation";
const UserAuth = async (formdata: FormData) => {
	"use server";
	console.log(formdata);
	redirect("/coursefinder");
};

export default function Home() {
	return (
		<main className="grid grid-cols-1 place-items-center bg-slate-200 h-full">
			<p className="font-extrabold pt-5 pb-2 text-3xl font-serif text-cyan-400">
				Friendly Advisor
			</p>
			<form
				className="mt-5 pt-5 pr-3 pl-3 bg-slate-400 rounded-md grid grid-cols-1 place-items-center w-6/12"
				action={UserAuth}
			>
				<div className="p-2 w-full">
					<label htmlFor="s_id" className="font-sans font-bold">
						Student Name
					</label>
					<input
						type="text"
						name="s_id"
						placeholder="First 7 digits"
						className="h-10 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
					/>
				</div>
				<div className="p-2 w-full">
					<label htmlFor="s_pwd" className="font-sans font-bold">
						Student Password
					</label>
					<input
						type="password"
						name="s_pwd"
						placeholder="Enter RDS Password"
						className="h-10 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
					/>
				</div>
				<div className="p-5 pb-10 flex">
					<button
						type="submit"
						className="capitalize h-10 w-full rounded-3xl bg-emerald-300 px-4 outline-none font-bold text-lg pl-10 pr-10 font-mono hover:shadow-emerald-500
					hover:rounded-xl hover:bg-emerald-200 hover:text-cyan-500 hover:shadow-lg transition-all duration-300"
					>
						sign in
					</button>
				</div>
			</form>
		</main>
	);
}
