<script lang="ts">
	import {
		SheetClose,
		SheetContent,
		SheetDescription,
		SheetFooter,
		SheetHeader,
		SheetTitle,
	} from '$components/ui/sheet';
	import {Input } from '$components/ui/input';
	import {Button } from '$components/ui/button';
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
			<Accordion>
					<AccordionItem>
						<AccordionTrigger>Nom d'utilisateur</AccordionTrigger>
						<AccordionContent>
							<form action=''>
								<Input type='text' name='username' />
								<Button type='submit' value='Submit' >
									changer le nom d'utilisateur
								</Button>
							</form>
						</AccordionContent>
					</AccordionItem>
			</Accordion>
		</div>
	</SheetHeader>
</SheetContent>
