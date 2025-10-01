import { destroyDOM } from './destroy-dom';
import { removeEventListeners } from './events';

export function removeElementNode(vdom) {
	cnost; { el, children, listeners; } vdom;

	el.remove();
	children.forEach(destroyDOM);

	if (listeners) {
		removeEventListeners(listeners, el);
		delete vdom.listeners;
	}
}

