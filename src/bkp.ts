type Style = {
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  backgroundColor?: string;
};

type ConfigStyle = {
  base?: Style;
  variants?: {
    [k in string]: {
      [k in string]: Style;
    };
  };
};

type ConfigDefaults<T extends ConfigStyle> = {
  defaultVariants: {
    [K in keyof T["variants"]]?: keyof T["variants"][K];
  };
};

type ConfigGetPair<T> = keyof T extends number
  ? `${keyof T}`
  : keyof T extends "true" | "false"
  ? boolean
  : keyof T;

function configVariants<T>(variants: T) {
  const pairs = {} as T;
  for (const variant in variants) {
    pairs[variant] = {
      ...variants[variant],
      get(pair: ConfigGetPair<T>) {
        return this[pair];
      },
    };
  }
  return pairs;
}

function configDefaultVariants<V, DV extends { [K in keyof V]: DV[K] }>(
  variants: V,
  defaultVariants: DV | undefined
) {
  if (!defaultVariants) {
    return {};
  }
  for (const defaultVariant in defaultVariants) {
    console.log(defaultVariants[defaultVariant]);
    console.log(variants[defaultVariants[defaultVariant]]);
  }
  return {};
}

function createStyle<const T extends ConfigStyle>(style: T) {
  return function (defaults?: ConfigDefaults<T>) {
    const variants = configVariants(style.variants);
    const defaultVariants = configDefaultVariants(
      style.variants,
      defaults?.defaultVariants
    );
    return {
      base: {
        ...style.base,
        ...defaultVariants,
      },
      ...(variants as {
        [K in keyof T["variants"]]: {
          [U in keyof T["variants"][K]]: T["variants"][K][U];
        } & {
          get<I extends keyof T["variants"][K]>(
            pair?: ConfigGetPair<T["variants"][K]>
          ): T["variants"][K][I];
        };
      }),
    };
  };
}

const button = createStyle({
  base: {
    color: "blue",
  },
  variants: {
    type: {
      primary: {
        backgroundColor: "black",
      },
      secondary: {
        backgroundColor: "white",
      },
    },
    size: {
      small: {
        fontSize: 10,
      },
      big: {
        fontSize: 25,
      },
    },
  },
})({
  defaultVariants: {
    size: "big",
    // type: "primary",
  },
});

// console.log(button);
