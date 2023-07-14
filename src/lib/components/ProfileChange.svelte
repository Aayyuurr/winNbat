<script lang="ts">
	import {
		SheetClose,
		SheetContent,
		SheetDescription,
		SheetFooter,
		SheetHeader,
		SheetTitle,
	} from '$components/ui/sheet';
	import { Input } from '$components/ui/input';
	import { Button } from '$components/ui/button';
	import LL from '$lib/i18n/i18n-svelte.js';
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger,
	} from '$components/ui/accordion';
</script>

<SheetContent position="bottom" size="full">
	<SheetHeader>
		<SheetTitle>{$LL.ProfilePage.CreerUnProfile()}</SheetTitle>
		<SheetDescription>{$LL.ProfilePage.InformationsPersonnelles()}</SheetDescription>
		<div>
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>Nom d'utilisateur</AccordionTrigger>
					<AccordionContent>
						<slot name="ChangeUsername" />
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-2">
					<AccordionTrigger>Votre adresse mail</AccordionTrigger>
					<AccordionContent>
						<slot name="ChangeEmail" />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Changer votre mdp</AccordionTrigger>
					<AccordionContent>
						<slot name="ChangeMdp" />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-4">
					<AccordionTrigger>Votre numéro de téléphone</AccordionTrigger>
					<AccordionContent>
						<slot name="SetPhone" />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-5">
					<AccordionTrigger>Votre adresse</AccordionTrigger>
					<AccordionContent>
						<slot name="SetLocation" />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-6">
					<AccordionTrigger>Changer votre langue</AccordionTrigger>
					<AccordionContent>
						<slot name="ChangeLangue" />
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-7">
					<AccordionTrigger>Changer votre date de naissance</AccordionTrigger>
					<AccordionContent>
						<slot name="ChangeBirthdate" />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	</SheetHeader>
</SheetContent>
