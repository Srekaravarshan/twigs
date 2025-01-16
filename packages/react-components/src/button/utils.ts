import { CSS } from '@stitches/react';
import { prefixClassName } from '@src/utils';
import { ButtonBaseProps, ButtonProps } from './button';
import { CircleLoaderProps, LineLoaderProps } from '../loader';
import { config } from '../stitches.config';

const buttonSizeToLineLoaderSizeMapping: Record<
  Extract<ButtonProps['size'], string>,
  {
    size: LineLoaderProps['size'];
  } & CSS<typeof config>
> = {
  '2xl': {
    size: 'lg'
  },
  xl: {
    size: 'md',
    width: '$5'
  },
  lg: {
    size: 'sm',
    width: '$5'
  },
  md: {
    size: 'sm',
    width: '$4'
  },
  sm: {
    size: 'sm',
    width: '$4'
  },
  xs: {
    size: 'sm',
    width: '$3'
  },
  xxs: {
    size: 'sm',
    width: '$3'
  }
};

const buttonSizeToCircleLoaderSizeMapping: Record<
  Extract<ButtonProps, string>,
  {
    size: CircleLoaderProps['size'];
  } & CSS<typeof config>
> = {
  '2xl': {
    size: 'lg'
  },
  xl: {
    size: 'lg'
  },
  lg: {
    size: 'lg'
  },
  md: {
    size: 'md'
  },
  sm: {
    size: 'sm'
  },
  xs: {
    size: 'xs'
  },
  xxs: {
    size: 'xs'
  }
};

export const getLoaderIconSizeFromButtonProps = ({
  buttonSize,
  loaderType
}: {
  loaderType: ButtonBaseProps['loader'];
  buttonSize: ButtonProps['size'];
}) => {
  if (loaderType === 'circle') {
    return buttonSizeToCircleLoaderSizeMapping[
      typeof buttonSize === 'string' ? buttonSize : 'lg'
    ];
  }

  return buttonSizeToLineLoaderSizeMapping[
    typeof buttonSize === 'string' ? buttonSize : 'lg'
  ];
};

type ButtonVariantString = Extract<ButtonProps['variant'], string>;
type ButtonColorString = Extract<ButtonProps['color'], string>;

export const buttonVariantToLoaderVariantMapping: Partial<
  Record<
    ButtonColorString | `${ButtonColorString}-${ButtonVariantString}`,
    LineLoaderProps['color']
  >
> = {
  default: 'secondary',
  bright: 'secondary',
  primary: 'primary',
  'primary-solid': 'bright',
  secondary: 'bright',
  'secondary-outline': 'secondary',
  'secondary-ghost': 'secondary',
  light: 'bright',
  error: 'negative'
};

export const getLoaderVariantFromButtonVariant = ({
  color,
  variant
}: {
  variant: ButtonProps['variant'];
  color: ButtonProps['color'];
}) => {
  const colorString = color as ButtonColorString;
  const variantString = variant as ButtonVariantString;

  if (buttonVariantToLoaderVariantMapping[`${colorString}-${variantString}`]) {
    return buttonVariantToLoaderVariantMapping[
      `${colorString}-${variantString}`
    ];
  }

  return buttonVariantToLoaderVariantMapping[colorString];
};

export const BUTTON_CLASSNAMES = {
  button: prefixClassName('button'),
  iconContainer: prefixClassName('button__icon-container'),
  iconBox: prefixClassName('button__icon-box'),
  loader: prefixClassName('button__loader'),
  content: prefixClassName('button__content'),
  loading: prefixClassName('button--loading'),
  disabled: prefixClassName('button--disabled'),
  sideElement: prefixClassName('button__side-element'),
  sideElementLoaderHidden: prefixClassName('button__side-element--loader-hidden'),
  sideElementIconHidden: prefixClassName('button__side-element--icon-hidden')
};
