import { useEffect } from 'react';

function useScrollToTop(state = []) {
	useEffect(
		() => {
			try {
				window.scroll({
					top: 0,
					left: 0,
					behavior: 'auto'
				});
			} catch (e) {
				window.scrollTo(0, 0);
			}
		},
		[ state ]
	);
}

export default useScrollToTop;
