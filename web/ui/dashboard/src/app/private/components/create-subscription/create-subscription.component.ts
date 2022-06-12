import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP, ENDPOINT } from 'src/app/models/app.model';
import { GROUP, SOURCE } from 'src/app/models/group.model';
import { ProjectService } from '../../pages/project/project.service';
import { PrivateService } from '../../private.service';
import { CreateSubscriptionService } from './create-subscription.service';

@Component({
	selector: 'app-create-subscription',
	templateUrl: './create-subscription.component.html',
	styleUrls: ['./create-subscription.component.scss']
})
export class CreateSubscriptionComponent implements OnInit {
	subscriptionForm: FormGroup = this.formBuilder.group({
		name: [null, Validators.required],
		type: [null, Validators.required],
		app_id: [null, Validators.required],
		source_id: [null, Validators.required],
		endpoint_id: [null, Validators.required],
		group_id: [null, Validators.required],
		alert_config: this.formBuilder.group({
			theshold: [null],
			time: [null]
		}),
		retry_config: this.formBuilder.group({
			type: [null],
			retry_count: [null],
			interval_seconds: [null]
		}),
		filter_config: this.formBuilder.group({
			event_types: [null]
		})
	});
	apps!: APP[];
	sources!: SOURCE[];
	endPoints?: ENDPOINT[];
	eventTags: string[] = [];
	showCreateAppModal = false;
	showCreateSourceModal = false;
	enableMoreConfig = false;
	retryLogicTypes = [
		{ id: 'linear', type: 'Linear time retry' },
		{ id: 'exponential', type: 'Exponential time backoff' }
	];
	isCreatingSubscription = false;
	@Output() onAction = new EventEmitter();
	@Input('action') action: 'update' | 'create' = 'create';
	projectType: 'incoming' | 'outgoing' = 'incoming';
	isLoadingForm = true;

	constructor(private formBuilder: FormBuilder, private privateService: PrivateService, private createSubscriptionService: CreateSubscriptionService, private route: ActivatedRoute) {}

	async ngOnInit() {
		this.isLoadingForm = true;
		await Promise.all([this.getApps(), this.getSources(), this.getGetProjectDetails()]);
		await this.getSubscriptionDetails();
		this.isLoadingForm = false;
	}

	async getSubscriptionDetails() {
		if (this.action !== 'update') return;

		try {
			const response = await this.createSubscriptionService.getSubscriptionDetail(this.route.snapshot.params.id);
			this.subscriptionForm.patchValue(response.data);
			this.subscriptionForm.patchValue({ source_id: response.data?.source_metadata?.uid, app_id: response.data?.app_metadata?.uid, endpoint_id: response.data?.endpoint_metadata?.uid });
			this.onUpdateAppSelection();
			this.eventTags = response.data.filter_config.event_types;
			return;
		} catch (error) {
			return error;
		}
	}

	async getApps() {
		try {
			const appsResponse = await this.privateService.getApps();
			this.apps = appsResponse.data.content;
			return;
		} catch (error) {
			return error;
		}
	}

	async getSources() {
		try {
			const sourcesResponse = await this.privateService.getSources();
			this.sources = sourcesResponse.data.content;
			return;
		} catch (error) {
			return;
		}
	}

	async getGetProjectDetails() {
		try {
			const response = await this.privateService.getProjectDetails();
			this.subscriptionForm.patchValue({
				group_id: response.data.uid,
				type: 'incoming'
			});
			this.projectType = response.data.type;
			return;
		} catch (error) {
			return;
		}
	}

	onUpdateAppSelection() {
		const app = this.apps.find(app => app.uid === this.subscriptionForm.value.app_id);
		this.endPoints = app?.endpoints;
	}

	async onCreateSource(newSource: SOURCE) {
		await this.getSources();
		this.subscriptionForm.patchValue({ source_id: newSource.uid });
	}

	async createSubscription() {
		this.subscriptionForm.patchValue({
			filter_config: { event_types: this.eventTags }
		});
		if (this.projectType === 'incoming' && this.subscriptionForm.invalid) return this.subscriptionForm.markAllAsTouched();
		if (
			this.subscriptionForm.get('name')?.invalid &&
			this.subscriptionForm.get('type')?.invalid &&
			this.subscriptionForm.get('app_id')?.invalid &&
			this.subscriptionForm.get('endpoint_id')?.invalid &&
			this.subscriptionForm.get('group_id')?.invalid
		) {
			return this.subscriptionForm.markAllAsTouched();
		}

		const subscription = this.subscriptionForm.value;
		if (this.projectType === 'outgoing') delete subscription.source_id;
		if (!this.enableMoreConfig) {
			delete subscription.alert_config;
			delete subscription.retry_config;
		}
		this.isCreatingSubscription = true;

		try {
			const response =
				this.action == 'update'
					? await this.createSubscriptionService.updateSubscription({ data: this.subscriptionForm.value, id: this.route.snapshot.params.id })
					: await this.createSubscriptionService.createSubscription(this.subscriptionForm.value);
			this.isCreatingSubscription = false;
			this.onAction.emit(response.data);
		} catch (error) {
			this.isCreatingSubscription = false;
		}
	}

	async onCreateNewApp(newApp: APP) {
		await this.getApps();
		this.subscriptionForm.patchValue({ app_id: newApp.uid });
	}

	removeEventTag(tag: string) {
		this.eventTags = this.eventTags.filter(e => e !== tag);
	}

	addTag() {
		const addTagInput = document.getElementById('tagInput');
		const addTagInputValue = document.getElementById('tagInput') as HTMLInputElement;
		addTagInput?.addEventListener('keydown', e => {
			const key = e.keyCode || e.charCode;
			if (key == 8) {
				e.stopImmediatePropagation();
				if (this.eventTags.length > 0 && !addTagInputValue?.value) this.eventTags.splice(-1);
			}
			if (e.which === 188 || e.key == ' ') {
				if (this.eventTags.includes(addTagInputValue?.value)) {
					addTagInputValue.value = '';
					this.eventTags = this.eventTags.filter(e => String(e).trim());
				} else {
					this.eventTags.push(addTagInputValue?.value);
					addTagInputValue.value = '';
					this.eventTags = this.eventTags.filter(e => String(e).trim());
				}
				e.preventDefault();
			}
		});
	}

	focusInput() {
		document.getElementById('tagInput')?.focus();
	}
}