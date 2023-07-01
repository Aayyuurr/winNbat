<script lang="ts">
  import type { PageData } from './$types';

  import { X } from 'lucide-svelte';

  import { Button } from '$components/ui/button';
  import { Input } from '$components/ui/input';
  import { Label } from '$components/ui/label';
  import { InputPassword } from '$components/ui/InputPassword';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from '$components/ui/card';
  import { LL } from '$lib/i18n/i18n-svelte';
  function goBack() {
    window.history.back();
  }
</script>
<div class="mt-16">
  <Card >
    <CardHeader>
      <Button class="w-14 h-14" variant="ghost" on:click={goBack}>
        <X class="w-14 h-14" />
      </Button>
      <CardTitle>{$LL.Inscription()}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription class="mb-4">
        {$LL.AjouterVosInformations()}
      </CardDescription>
      <form class="grid gap-4" method="POST" action="/sign-up"  >

        <div class="grid gap-2">
          <Label for="username">{$LL.Username()}</Label>
          <Input id="username" type="text" placeholder=""  autocomplete="username"  />
        </div>

        <div class="grid gap-2">
          <Label for="date">{$LL.DateDeNaissance()}</Label>
          <Input id="date" type="date" placeholder=""  autocomplete="date"
          min="1920-01-01" max="2023-12-31"
          />
        </div>


        <div class="grid gap-2">
          <Label for="email">{$LL.Email()}</Label>
          <Input id="email" type="email" placeholder="E-mail@example.com"  autocomplete="email"  />
        </div>
        <div class="grid gap-2">
          <Label for="password">{$LL.Password()}</Label>
          <InputPassword id="password" type="password" autocomplete="new-password"  />
        </div>
        <div class="grid gap-2 -mt-7">
          <Label for="password">{$LL.ConfirmPassword()}</Label>
          <InputPassword id="password" type="password" autocomplete="new-password"  />
        </div>
      </form>
    </CardContent>
  </Card>
</div>
