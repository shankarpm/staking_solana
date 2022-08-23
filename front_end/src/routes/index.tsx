import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../screens/Dashboard/Dashboard";
import TransactionMain from "../screens/Transaction/TransactionMain";

const AppMain = () => {
    return (
        <>
            <Suspense fallback={<span>loading</span>}>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/transaction" component={TransactionMain} />
                </Switch>
            </Suspense>
        </>
    );
};

export default AppMain;
