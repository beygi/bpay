// import all font awesome icons seperately
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBtc, faEthereum, faGoogle, faGripfire } from "@fortawesome/free-brands-svg-icons";
// import { faHandshake } from "@fortawesome/free-regular-svg-icons";

import {
    faAddressCard, faAngleDown, faArchive, faBalanceScale, faBox, faChartLine, faCheck, faCopy, faDollarSign, faDonate, faEdit, faExchangeAlt, faHandHolding,
    faHandHoldingUsd, faHandshake, faHistory, faHourglassHalf, faKey, faLink, faLock, faMoneyCheckAlt, faQrcode, faSearch, faSnowflake, faTimes, faUserClock, faWallet,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHandHolding, faArchive, faGoogle, faLock, faUserClock, faLink,
    faEdit, faKey, faSearch, faWallet, faHistory, faBtc, faDollarSign, faEthereum, faBox, faBalanceScale, faExchangeAlt, faGripfire, faSnowflake,
    faDonate, faHandHoldingUsd, faMoneyCheckAlt, faHandshake, faAddressCard, faAngleDown, faQrcode, faCopy, faChartLine, faCheck, faTimes, faHourglassHalf);
