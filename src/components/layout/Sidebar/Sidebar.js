import React from 'react';

import SidebarWinTotals from './SidebarWinTotals';
import SidebarLeaderboard from './SidebarLeaderBoard';
import SidebarSection from './SidebarSection';

import './Sidebar.scss';

const Sidebar = ({ data }) => {
	return (
		<React.Fragment>
			<aside className='sidebar'>
				<SidebarSection title='Leader Board'>
					<SidebarLeaderboard leaderBoard={data.leaderBoard} />
				</SidebarSection>
				<SidebarSection title='Win Totals'>
					<SidebarWinTotals winTotals={data.winTotals} />
				</SidebarSection>
			</aside>
		</React.Fragment>
	);
};

export default Sidebar;
