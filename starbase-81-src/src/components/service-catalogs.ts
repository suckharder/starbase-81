import { is } from "../shared/is";
import { IServiceCategory } from "../shared/types";
import { CATEGORIES } from "../variables";
import { Services } from "./services";
import { THEME } from "../variables";

interface IProps {
	categories: IServiceCategory[];
}

export const ServiceCatalogList = function (props: IProps) {
	const { categories } = props;

	return `
		<ul>
			${categories.map(category => ServiceCatalog({ category })).join("")}
		</ul>
	`;
};

interface ICatalogProps {
	category: IServiceCategory;
}

const ServiceCatalog = function (props: ICatalogProps) {
	const { category } = props;

	let categoryClassName = "dark:text-slate-200";
	// Theme forcing fix - if theme is always light/dark, disregard OS/browser settings
	if ((THEME as string) !== "auto"){
		categoryClassName = "";
	}
	switch (CATEGORIES as string) {
		case "small":
			// Theme forcing fix - if theme is always light/dark, disregard OS/browser settings
			if ((THEME as string) === "auto"){categoryClassName += " text-sm text-slate-800 font-semibold py px-4 uppercase";}
			if ((THEME as string) === "dark"){categoryClassName += "text-sm text-slate-200 dark:text-slate-200 font-semibold py px-4 uppercase";}
			if ((THEME as string) === "light"){categoryClassName += "text-sm text-slate-800 dark:text-slate-800 font-semibold py px-4 uppercase";}
			break;
		case "normal":
		default:
			// Theme forcing fix - if theme is always light/dark, disregard OS/browser settings
			if ((THEME as string) === "auto"){categoryClassName += " text-2xl text-slate-600 font-light py-2 px-4";}
			if ((THEME as string) === "dark"){categoryClassName += "text-2xl text-slate-200 dark:text-slate-200 font-light py-2 px-4";}
			if ((THEME as string) === "light"){categoryClassName += "text-2xl text-slate-600 dark:text-slate-600 font-light py-2 px-4";}
			break;
	}

	let liClassName = "mt-12 first:mt-0 xl:first:mt-6";

	if (category.bubble) {
		liClassName += " rounded-2xl px-6 py-6 ring-1 ring-slate-900/5 shadow-xl";

		if ((THEME as string) === "auto"){
			liClassName += " var-category-bubble-bg";
			if (!is.null(category.bubbleBGLight)) {
				liClassName += ` !bg-${category.bubbleBGLight}`;
			}

			if (!is.null(category.bubbleBGDark)) {
				liClassName += ` dark:!bg-${category.bubbleBGDark}`;
			}
		} else {
			// Theme forcing fix - if theme is always light/dark, disregard OS/browser settings
			if ((THEME as string) === "dark"){
				liClassName += " var-category-bubble-bg-forcedark";
			}
			if ((THEME as string) === "light"){
				liClassName += " var-category-bubble-bg";
			}
		}
	}

	return `
		<li class="${liClassName}">
			<h2 class="${categoryClassName}">${category.category}</h2>
			${Services({ services: category.services, categoryBubblePadding: category.iconBubblePadding })}
		</li>
	`;
};
