
import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface ValidationErrors {
  [key: string]: string;
}

export const useFormValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = useCallback((fieldName: string, value: any): string | null => {
    const rule = rules[fieldName];
    if (!rule) return null;

    // Vérification required
    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return `${fieldName} est requis`;
    }

    // Si la valeur est vide et non requise, pas d'autres validations
    if (!value || (typeof value === 'string' && !value.trim())) {
      return null;
    }

    // Vérification minLength
    if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
      return `${fieldName} doit contenir au moins ${rule.minLength} caractères`;
    }

    // Vérification maxLength
    if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
      return `${fieldName} ne peut pas dépasser ${rule.maxLength} caractères`;
    }

    // Vérification pattern
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      return `Format de ${fieldName} invalide`;
    }

    // Validation personnalisée
    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }, [rules]);

  const validateForm = useCallback(async (formData: Record<string, any>): Promise<boolean> => {
    setIsValidating(true);
    const newErrors: ValidationErrors = {};

    try {
      // Validation synchrone de tous les champs
      for (const [fieldName, value] of Object.entries(formData)) {
        const error = validateField(fieldName, value);
        if (error) {
          newErrors[fieldName] = error;
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    } catch (error) {
      console.error('Form validation error:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [validateField]);

  const validateSingleField = useCallback((fieldName: string, value: any) => {
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error || undefined
    }));
    return !error;
  }, [validateField]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    errors,
    isValidating,
    validateForm,
    validateSingleField,
    clearErrors,
    clearFieldError,
    hasErrors: Object.keys(errors).length > 0,
  };
};
