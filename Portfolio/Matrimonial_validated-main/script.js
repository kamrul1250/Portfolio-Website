function previewImage(event) {
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function clearPreview() {
  document.getElementById("preview").src = "2.jpg";
  document.getElementById("Image").value = "";
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('matrimonialForm');
  const inputs = form.querySelectorAll('input, textarea, select');

  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.type === 'radio') {
        validateRadioGroup(input.name);
      } else {
        applyValidationStyle(input);
      }
    });

    form.addEventListener('reset', () => {
      input.classList.remove('valid', 'invalid');
      if (input.closest('.radio-group')) {
        input.closest('.radio-group').classList.remove('valid', 'invalid');
      }
    });
  });

  // Submit validation logic
  form.addEventListener('submit', function (e) {
    let isValid = true;

    // Validate all individual inputs
    inputs.forEach(input => {
      if (input.type === 'radio') {
        validateRadioGroup(input.name);
      } else {
        applyValidationStyle(input);
      }

      // If any input has 'invalid' class, stop submission
      if (input.classList.contains('invalid')) {
        isValid = false;
      }
    });

    // Validate all radio groups separately
    const radioNames = new Set(
      Array.from(form.querySelectorAll('input[type="radio"]')).map(r => r.name)
    );
    radioNames.forEach(name => {
      const radios = form.querySelectorAll(`input[name="${name}"]`);
      const group = radios[0].closest('.radio-group');
      const isChecked = [...radios].some(r => r.checked);
      group.classList.remove('valid', 'invalid');
      if (isChecked) {
        group.classList.add('valid');
      } else {
        group.classList.add('invalid');
        isValid = false;
      }
    });

    // Cancel submission if invalid
    if (!isValid) {
      e.preventDefault();
      alert('❌ Please fix the fields marked with red cross before submitting.');
    } else {
      alert('✅ The form has been uploaded successfully!');
    }
  });
});

function applyValidationStyle(input) {
  input.classList.remove('valid', 'invalid');

  // Optional fields — skip if empty
  if (!input.required && input.value.trim() === '') return;

  if (input.checkValidity()) {
    input.classList.add('valid');
  } else {
    input.classList.add('invalid');
  }
}

function validateRadioGroup(groupName) {
  const radios = document.querySelectorAll(`input[name="${groupName}"]`);
  const parent = radios[0].closest('.radio-group');
  if (!parent) return;
  const isChecked = [...radios].some(r => r.checked);
  parent.classList.remove('valid', 'invalid');
  if (isChecked) {
    parent.classList.add('valid');
  } else {
    parent.classList.add('invalid');
  }
}
