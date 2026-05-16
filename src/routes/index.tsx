import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/_app', // بيوجّه المستخدم لـ دخلة الأبلكيشن الصح
    })
  },
})
