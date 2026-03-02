import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'

const EditLecture = () => {
    const params = useParams()
    const courseId = params.courseId
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4 md:p-10">

  {/* Header */}
  <div className="flex items-center justify-between mb-8">

    <div className="flex items-center gap-3">

      <Link to={`/course/${courseId}/lecture`}>
        <Button
          size="icon"
          variant="outline"
          className="
            rounded-full 
            bg-white dark:bg-gray-800 
            border-gray-300 dark:border-gray-700
          "
        >
          <ArrowLeft size={16} className="text-gray-700 dark:text-gray-200" />
        </Button>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Update Your Lecture
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Edit lecture details and manage content.
        </p>
      </div>

    </div>
  </div>

  {/* Content Card */}
  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm dark:shadow-lg p-6">
    <LectureTab />
  </div>

</div>
    )
}

export default EditLecture