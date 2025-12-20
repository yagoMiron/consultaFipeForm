import type { MaskOptions, TrackingData } from "@react-input/mask";

export const phoneMask: MaskOptions = {
  mask: "(##) ####-####",
  replacement: {
    "#": /\d/,
  },
  modify: (data: TrackingData) => {
    const numbers = data.value.replace(/\D/g, "");

    return {
      mask: numbers.length >= 10 ? "(##) #####-####" : "(##) ####-####",
    };
  },
};

/*
export const cpfMask = {
  mask: "___.___.___-__",
  replacement: { _: /\d/ },
};

export const cepMask = {
  mask: "_____-___",
  replacement: { _: /\d/ },
};

export const cnpjMask = {
  mask: "__.___.___/____-__",
  replacement: { _: /\d/ },
};


export const rgMask = useMask({
    mask: "00.000.000",
    replacement: { 0: /\d/ },
});

export const numberMask = {
  mask: "_______",
  replacement: { _: /\d/ },
};
*/
