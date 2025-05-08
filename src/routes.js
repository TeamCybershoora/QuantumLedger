import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/newDashboard'))
const Report = React.lazy(() => import('./views/report/Report'))
const Staff = React.lazy(() => import('./views/staff/Staff'))
const Reservations = React.lazy(() => import('./views/reservations/Reservations'))
const Accounts = React.lazy(()=> import('./views/accounts/Accounts'))
const Sales = React.lazy(() => import('./views/sales/Sales'))
const Purchase = React.lazy(() => import('./views/purchase/Purchase'))
const PaymentMethod = React.lazy(() => import('./views/paymentMethod/PaymentMethod'))
const CustomerSupport = React.lazy(() => import('./views/customerSupport/CustomerSupport'))

const UserList = React.lazy(() => import('./views/users/UsersList'))
const Features = React.lazy(() => import('./views/yourDetails/putFeatures/Features'))
const AddFeature = React.lazy(() => import('./views/yourDetails/putFeatures/AddFeature'))
const EditFeature = React.lazy(() => import('./views/yourDetails/putFeatures/EditFeature'))
const ViewFeature = React.lazy(() => import('./views/yourDetails/putFeatures/ViewFeature'))
const Social = React.lazy(() => import('./views/yourDetails/socialLinks/Social'))
const AddSocial = React.lazy(() => import('./views/yourDetails/socialLinks/AddSocial'))
const EditSocial = React.lazy(() => import('./views/yourDetails/socialLinks/EditSocial'))
const ViewSocial = React.lazy(() => import('./views/yourDetails/socialLinks/ViewSocial'))
const WebsiteNameWithLog = React.lazy(() => import('./views/yourDetails/putWebName&Logos/WebsiteNameWithLogo'))
const BgImages = React.lazy(() => import('./views/yourDetails/putBgImages/BgImages'))
const Helper = React.lazy(() => import('./views/yourDetails/helperLinks/helper'))
const Contact = React.lazy(() => import('./views/contact/Contact'))
const Profile = React.lazy(() => import('./views/Profile/Profile'))



const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/report', name: 'Report', element: Report },
  { path: '/staff', name: 'Staff', element: Staff },
  { path: '/reservations', name: 'Reservations', element: Reservations },
  { path: '/accounts', name: 'Accounts', element: Accounts },
  { path: '/Sales', name: 'Sales', element: Sales },
  { path: '/Purchase', name: 'Purchase', element: Purchase },
  { path: '/paymentMethod', name: 'Payment Method', element: PaymentMethod },
  { path: '/CustomerSupport', name: 'Customer Support', element: CustomerSupport },

  { path: '/users', name: 'Users', element: UserList },
  { path: '/features', name: 'Features', element: Features },
  { path: '/add-feature', name: 'Features', element: AddFeature },
  { path: '/edit-feature/:id', name: 'Features', element: EditFeature },
  { path: '/view-feature/:id', name: 'Features', element: ViewFeature },
  { path: '/socialLinks', name: 'Social Links', element: Social },
  { path: '/add-social', name: 'Social Links', element: AddSocial },
  { path: '/edit-social/:id', name: 'Social Links', element: EditSocial },
  { path: '/view-social/:id', name: 'Social Links', element: ViewSocial },
  { path: '/nameAndLogo', name: 'Website Name And Logo', element: WebsiteNameWithLog },
  { path: '/imagesForBg', name: 'Images for Background', element: BgImages },
  { path: '/helperLinks', name: 'Helper Links', element: Helper },
  { path: '/inquiries', name: 'Inquiries', element: Contact },
  { path: '/profile', name: 'Profile', element: Profile },

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
