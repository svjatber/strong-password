<template>
  <div class="password">
    <h3 class="text-center">Type password</h3>
    <input
      class="password__input"
      :value="modelValue"
      data-test="password-field"
      @input="(event) => $emit('update:modelValue', event.target.value)"
    />
    <div class="password__section">
      <ul class="password__rules">
        <li
          v-for="(rule, key) in rules"
          :key="rule.message"
          class="password__rules__item"
          :data-test-rule-indicator="key"
          :class="{
            'line-through': rule.pass,
            'password-hint__rule--pass': rule.pass,
            'password-hint__rule--fail': !rule.pass,
          }"
        >
          {{ rule.message }}
        </li>
      </ul>

      <AppProgress
        v-show="progress.modelValue"
        class="password__progress"
        :value="progress.modelValue"
        :color="progress.color"
      >
        {{ progress.message }}
      </AppProgress>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from "vue";
import {
  StrengthOption,
  StrengthOptionLabel,
  COUNT_VAILDATORS_STRONG,
  RULE,
} from "@/domain/password";
import AppProgress from "@/components/AppProgress.vue";

const props = defineProps({ modelValue: { type: String, required: true } });
defineEmits(["update:modelValue"]);

const rules = reactive({
  [RULE.OneLetter]: {
    pass: false,
    func(value) {
      this.pass = /[a-zA-Z]/g.test(value);
    },
    message: "Has at least one letter",
  },
  [RULE.UpperAndLower]: {
    pass: false,
    func(value) {
      this.pass = /^(?=.*[a-z])(?=.*[A-Z]).+$/.test(value);
    },
    message: "Has at least one lower and one upper case letter",
  },
  [RULE.OneNumber]: {
    pass: false,
    func(value) {
      this.pass = /[/[0-9]/g.test(value);
    },
    message: "Has at least one number",
  },
  [RULE.SpecialSymbol]: {
    pass: false,
    func(value) {
      this.pass = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g.test(value);
    },
    message: "Has at least one special character",
  },
  [RULE.LongerThan4]: {
    pass: false,
    func(value) {
      this.pass = value.length > 4;
    },
    message: "Has length > 4",
  },
  [RULE.LongerThan8]: {
    pass: false,
    func(value) {
      this.pass = value.length > 8;
    },
    message: "Has length > 8",
  },
  [RULE.LongerThan12]: {
    pass: false,
    func(value) {
      this.pass = value.length > 12;
    },
    message: "Has length > 12",
  },
});

const progress = computed(() => {
  const validators = Object.values(rules);
  const passedValidators = validators.filter((r) => r.pass);
  const diff = (passedValidators.length * 100) / validators.length;

  return passedValidators.length >= COUNT_VAILDATORS_STRONG
    ? {
        color: "#4BB543",
        modelValue: diff,
        message: StrengthOptionLabel[StrengthOption.Strong],
      }
    : {
        color: "#FFD580",
        modelValue: diff,
        message: StrengthOptionLabel[StrengthOption.Weak],
      };
});

function validateField(value) {
  Object.values(rules).forEach((val) => {
    val.func(value);
  });
}

watch(
  () => props.modelValue,
  (newValue) => {
    validateField(newValue);
  },
  { immediate: true }
);
</script>

<style scoped>
.password {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
.password__section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
}

.password__input {
  padding: 5px;
  border: 0;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  min-width: 100px;
  width: 100%;
  font-size: 0.875rem;
  box-sizing: border-box;
}

.password__input:focus {
  outline: none;
}

.password__rules {
  list-style-type: none;
  padding: 0;
  order: 999;
}
.password__progress {
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 640px) {
  .password__rules {
    order: -999;
  }
}
</style>
