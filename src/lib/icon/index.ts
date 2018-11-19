// import all font awesome icons seperately
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBtc, faEthereum, faGoogle, faGripfire } from "@fortawesome/free-brands-svg-icons";
import { faMoon as Day } from "@fortawesome/free-regular-svg-icons";

import {
    faAddressCard, faArchive, faArrowLeft, faBalanceScale, faBox, faChartLine, faCheck, faCheckDouble, faCopy, faDollarSign, faDonate, faEdit, faExchangeAlt,
    faExternalLinkAlt, faHandHolding, faHandHoldingUsd, faHandshake, faHistory, faHourglassHalf, faKey, faLink, faLock, faMoneyCheckAlt,
    faMoon, faPlus, faQrcode, faSearch, faSnowflake, faTimes, faUserClock, faWallet,
} from "@fortawesome/free-solid-svg-icons";

library.add(faMoon, Day, faPlus, faCheckDouble, faHandHolding, faArchive, faGoogle, faLock, faUserClock, faLink, faExternalLinkAlt,
    faEdit, faKey, faSearch, faWallet, faHistory, faBtc, faDollarSign, faEthereum, faBox, faBalanceScale, faExchangeAlt, faGripfire, faSnowflake,
    faDonate, faHandHoldingUsd, faMoneyCheckAlt, faHandshake, faAddressCard, faArrowLeft, faQrcode, faCopy, faChartLine, faCheck, faTimes, faHourglassHalf);
