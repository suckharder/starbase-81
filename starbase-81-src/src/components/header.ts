import { is } from "../shared/is";
import { SHOWAUTHWIDGET, AUTHENTIKURL } from "../variables";

let auth_url = "https://" + AUTHENTIKURL + "/api/v3/core/users/me/";
let auth_login = "https://" + AUTHENTIKURL;

interface IProps {
	title?: string;
	icon?: string;
}

export const Header = function (props: IProps) {
	const { icon, title } = props;

	return `
		<div class="p-2 xl:p-4 flex flex-wrap justify-center items-center gap-2 xl:flex-wrap">
			${!is.null(icon) ? 
				(`<img src="${icon}" alt="${title || ""}" class="inline-block w-16 h-16" />`) :
				``
			}
			<h1>${title}</h1>
			${
				SHOWAUTHWIDGET
					? `
						<div id="auth-widget" class="mx-auto mt-2 basis-full max-w-[80vw] flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">

							<p id="loadingText" class="text-gray-700 dark:text-slate-100">Loading...</p>

							<p id="nlText" class="text-gray-700 dark:text-slate-100" style="display: none;">Authentik: Not logged in</p>
							<button id="nlButt" class="bg-indigo-800 text-white px-3 py-1 rounded hover:bg-indigo-500" onclick="window.open('${auth_login}', '_blank')" style="display: none;">
								Login
							</button>

							<img id="lImg" src="/default_avatar.jpg" alt="Avatar" class="w-8 h-8 rounded-full" style="display: none;"/>

							<p id="lText" class="text-gray-700 dark:text-slate-100 font-medium" style="display: none;">
								Logged in as:
							</p>				

						</div>
						<script>
							let ISLOGGEDIN = false;
							let USERNAME = "";
							let NAME = "";
							let AVATAR = ""
							
							async function authentikAPIfetch() {
								try {

									const response = await fetch("${auth_url}", {method: "GET", headers: { "Accept": "application/json" }, credentials: "include"});

									if (!response.ok) {
									ISLOGGEDIN = false;
									return;
									}

									const data = await response.json();

									if (data && data.user) {
									ISLOGGEDIN = true;
									USERNAME = data.user.username || "";
									NAME = data.user.name || "";
									AVATAR = data.user.avatar || "";
									} else {
									ISLOGGEDIN = false;
									}

								}
								catch (error) {
									ISLOGGEDIN = false;
								}

								}

							function renderWidget() {
								if (!ISLOGGEDIN) {
									document.getElementById('loadingText').style.display = 'none';
									document.getElementById('nlText').removeAttribute('style');
									document.getElementById('nlButt').removeAttribute('style');
								}
								else {
									if (AVATAR) {
										document.getElementById('loadingText').style.display = 'none';
										document.getElementById('lImg').src = AVATAR;
										document.getElementById('lImg').removeAttribute('style');
									}
									else {
										document.getElementById('loadingText').style.display = 'none';
										document.getElementById('lImg').removeAttribute('style');
									}
									if (NAME) {
										document.getElementById('lText').textContent = 'Logged in as: ' + NAME;
										document.getElementById('lText').removeAttribute('style');
									}
									else {
										document.getElementById('lText').textContent = 'Logged in as: ' + USERNAME;
										document.getElementById('lText').removeAttribute('style');
									}
								}
							}

							async function initWidget() {
								await authentikAPIfetch();
								renderWidget();
							}

							document.addEventListener("DOMContentLoaded", initWidget);

							let lastCheck = 0;
							window.addEventListener("focus", () => {
								document.getElementById('loadingText').removeAttribute('style');
								document.getElementById('nlText').style.display = 'none';
								document.getElementById('nlButt').style.display = 'none';
								document.getElementById('lImg').style.display = 'none';
								document.getElementById('lText').style.display = 'none';
								const now = Date.now();
								if (now - lastCheck > 2000) {
									lastCheck = now;
									initWidget();
								}
							});
						</script>
					`
					: ``
			}
		</div>
	`;
};


// old

/* <div id="auth-widget" class="mx-auto mt-2 basis-full max-w-[80vw] flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
							${
								ISLOGGEDIN
									? `
										${
											AVATAR
												? `
													<img src="${AVATAR}" alt="Avatar" class="w-8 h-8 rounded-full" />
												`
												: `
													<img src="/default_avatar.jpg" alt="Avatar" class="w-8 h-8 rounded-full" />
												`
										}
										${
											NAME
												? `
													<p class="text-gray-700 dark:text-slate-100 font-medium">
														Logged in as: ${NAME}
													</p>
												`
												: `
													<p class="text-gray-700 dark:text-slate-100 font-medium">
														Logged in as: ${USERNAME}
													</p>
												`
										}
									`
									: `
										<span class="text-gray-700 dark:text-slate-100">Authentik: Not logged in</span>
										<button class="bg-indigo-800 text-white px-3 py-1 rounded hover:bg-indigo-500" onclick="window.open('${auth_login}', '_blank')" >
											Login
										</button>
									`
							}
</div> */