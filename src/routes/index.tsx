import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    // التوجيه الصريح لـ Layout الأساسي بتاع الأبلكيشن
    throw redirect({
      to: '/_app',
    })
  },
})
