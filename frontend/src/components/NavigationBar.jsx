import premierLogo from '../assets/english_premier_league.png'

const NavigationBar = () => {
    return(
        <div className="bg-dark-indigo">
            <div className="h-16 px-8 flex items-center">
                <img src={premierLogo} alt="English Premier League" height={100} width={100}/>
                <p className=" menu text-light font-bold text-left mx-10 tracking-wider">English Premier League</p>
            </div>
        </div>
    );
}

export default NavigationBar;