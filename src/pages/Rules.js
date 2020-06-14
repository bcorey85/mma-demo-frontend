import React from 'react';

import RuleBlock from '../components/shared/RuleBlock';
import OrderedList from '../components/shared/OrderedList';
import LineItem from '../components/shared/LineItem';
import BlockQuote from '../components/shared/BlockQuote';

const Rules = () => {
	return (
		<React.Fragment>
			<main className='main-content--fw'>
				<h2 className='page-title'>League Rules</h2>
				<RuleBlock title='Winners & Losers' icon='fas fa-trophy'>
					<OrderedList start='1' listType='num'>
						<LineItem>
							Winner will be determined after 4 cards by the
							player with the highest point balance. Cards will be
							set at time of league start.
						</LineItem>
					</OrderedList>
				</RuleBlock>
				<RuleBlock title='Procedures' icon='fas fa-cog'>
					<OrderedList start='2' listType='num'>
						<LineItem>
							Commitment to play will need to be received by
							commissioner no later than 1 week before 1st card.
						</LineItem>
						<LineItem>
							Each participant will submit name with fight name
							examples:
							<BlockQuote>
								<OrderedList listType='letter'>
									<LineItem>Bob (BONES) Jones</LineItem>
									<LineItem>
										Holly (THE HAMMER) Peach
									</LineItem>
									<LineItem>Frank (THE TANK) Abbot</LineItem>
								</OrderedList>
							</BlockQuote>
						</LineItem>
						<LineItem>
							Players will receive 1000 in credits
						</LineItem>
						<LineItem>
							The top 5 fights on the main card can be wagered on.
						</LineItem>
						<LineItem>
							You will need to wager on 4 out of the 5 fights per
							card. No more no less.
						</LineItem>
						<LineItem>
							Bet minimum is 25 credits per fight.
						</LineItem>
						<LineItem>
							Bets will be made in 25 credit increments.
						</LineItem>
						<LineItem>
							Players will receive 50 credit bonus for correctly
							picking 4 correct fights on a single card.
						</LineItem>
						<LineItem>
							The commissioner will set fight odds on Monday
							before the fight. These will be based on Vegas odds.
							Odds will be whole numbers for easier calculations.
							Odds will not change once set on Monday before the
							fight.
						</LineItem>
						<LineItem>
							Bets will be submitted to Commissioner by the
							Thursday at midnight before the card. Bets not
							received by midnight Thursday will incur a penalty.
							(This will allow The Commissioner time to compile
							the bets and distribute the list prior to the start
							of the main card Saturday).
						</LineItem>
						<LineItem>
							Winning/ losing calculations will be made from Odds
							calculator.
						</LineItem>
						<LineItem>
							For easy calculations all winnings will be rounded
							to the nearest whole number. Greater than .50
							rounded up. Less than .50 rounded down.
						</LineItem>
						<LineItem>
							Failure to place wagers for a fight card will result
							in a 500.00 credit penalty.
						</LineItem>
						<LineItem>
							Failure to place wagers in time for a fight card
							will result in a 100.00 credit penalty.
						</LineItem>
						<LineItem>
							If you wager all of your credits and loose; and you
							remaining balance is less than 25 in credit after a
							card you will automatically lose and will not be
							eligible to wager on following cards.
						</LineItem>
						<LineItem>
							If your remaining balance is greater than 25 but
							less that 100 you will be allowed to bet your
							remaining balance on the following card at less than
							the 4 fight minimum but will need to make the 25
							minimum on each of the fights wagered.
						</LineItem>
						<LineItem>
							In the event of tie one additional fight card will
							be added and tied players will choose winners and
							losers from this card (main and under card). The
							player with the most correct picks will be declared
							the winner. In the unlikely event of an additional
							tie this process will continue until there is a
							clear winner. (Commissioner will choose fight cards
							for the tie breaker).
						</LineItem>
						<LineItem>
							In the unlikely event of an additional tie this will
							be repeated until time of clear winner.
						</LineItem>
					</OrderedList>
				</RuleBlock>
				<RuleBlock
					title='DQs, Suspensions, USADA, and Forfeit'
					icon='fas fa-ban'>
					<OrderedList start='20' listType='num'>
						<LineItem>
							Fight result wins will remain in place regardless of
							USADA or commission findings.
						</LineItem>
						<LineItem>
							In case of disqualification, regulating body will
							determine the winner.
						</LineItem>
						<LineItem>
							In case of disqualification without a winner,
							resulting from a no contest decision, credits
							wagered will be returned to wagering player without
							penalty.
						</LineItem>
						<LineItem>
							If a fighter is pulled from the card after weighing
							in you will have until Saturday morning (Friday at
							midnight) to:
							<BlockQuote>
								<OrderedList listType='letter'>
									<LineItem>
										Submit an alternate bet on the remaining
										fighter and alternate fighter.
									</LineItem>
									<LineItem>
										If a fight is fully cancelled, submit an
										alternate bet on a remaining fight out
										of the 5 original fights on the card
										that was previously not bet on.
									</LineItem>
									<LineItem>
										If alternate wager is not received by
										Saturday (midnight Friday), original
										wager will be placed on the underdog of
										the replacement fight or on underdog of
										remaining fight.
									</LineItem>
								</OrderedList>
							</BlockQuote>
						</LineItem>
						<LineItem>
							If fight is canceled on day of card (after Friday at
							midnight) wager will be returned without penalty. No
							other wagers will be accepted.
						</LineItem>
					</OrderedList>
				</RuleBlock>
				<RuleBlock title='Commissioner' icon='fas fa-gavel'>
					<OrderedList start='25' listType='num'>
						<LineItem>
							There will be a 1 week grace period to dispute
							commissioner findings or calculations once posted.
							After this time all calculations and decisions are
							final and cannot be changed.
						</LineItem>
						<LineItem>
							In the spirit of fairness, the Commissioner as a
							player will make his wagers prior to looking at and
							calculating all other player wagers.
						</LineItem>
						<LineItem>
							Commissioner’s decisions will be final.
						</LineItem>
					</OrderedList>
				</RuleBlock>
			</main>
		</React.Fragment>
	);
};

export default Rules;
