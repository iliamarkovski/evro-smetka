import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils';
import { BUTTON_VARIANTS } from '@/constants';
import type { VariantProps } from 'class-variance-authority';

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof BUTTON_VARIANTS> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return <Comp data-slot="button" className={cn(BUTTON_VARIANTS({ variant, size, className }))} {...props} />;
}

export { Button };
