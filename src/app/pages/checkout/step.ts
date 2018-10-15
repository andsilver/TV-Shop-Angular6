import { CheckoutService } from './checkout.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export abstract class CheckoutStep implements OnDestroy {

    currentStep: any;
    nextStep: any;
    loaded = false;

    subscriptions = [];

    steps = [
        {
            title: 'Uw Gegevens',
            index: 1,
            url: 'customers-info'
        },
        {
            title: 'Bezorg/Betaalmethode',
            index: 2,
            url: 'methods'
        },
        {
            title: 'Overzicht',
            index: 3,
            url: 'order-overviews'
        },
        {
            title: 'Afgerond',
            index: 4,
            url: 'order-processing'
        }
    ];

    constructor(public checkoutService: CheckoutService, public router: Router, public route: ActivatedRoute) {

        this.subscriptions = [
            this.router.events.subscribe(event => {
            if ( event instanceof NavigationEnd) {
                const path = this.router.url.split('/')[2];
                this.setCurrentStep(path);
                this.nextStep = this.getNextStep();
                this.loaded = true;
            }
        })];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    getCurrentStep(path: string) {
        return this.steps.find(step => step.url === path);
    }

    getNextStep() {
        return this.steps.find(step => step.index === this.currentStep.index + 1);
    }

    getPrevStep() {
        return this.steps.find(step => step.index === this.currentStep.index - 1);
    }

    setCurrentStep(path: string) {
        this.currentStep = this.getCurrentStep(path);
        if (!this.currentStep) {
            this.router.navigate(['404']);
        }
    }

    gotoNextStep() {
        this.loaded = false;
        this.router.navigate([ '/checkout', this.getNextStep().url ]);
    }

    gotoPreviousStep() {
        this.loaded = false;
        this.router.navigate([ '/checkout', this.getPrevStep().url ]);
    }
}
