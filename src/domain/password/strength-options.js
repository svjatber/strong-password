const StrengthOption = {
  Weak: "weak",
  Strong: "strong",
};

const StrengthOptionLabel = {
  [StrengthOption.Weak]: "Password is weak",
  [StrengthOption.Strong]: "Password is strong enough",
};

const COUNT_VAILDATORS_STRONG = 5;

export { StrengthOption, StrengthOptionLabel, COUNT_VAILDATORS_STRONG };
