<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Employé; // Ensure correct namespace and class name for Employé
use App\Models\employés;

class DemandeNotification extends Notification
{
    use Queueable;

    protected $employee;
    protected $requestData;

    /**
     * Create a new notification instance.
     *
     * @param Employé $employee The employee concerned by the notification
     * @param array $requestData The request data
     * @return void
     */
    public function __construct(employés $employee, array $requestData)
    {
        $this->employee = $employee;
        $this->requestData = $requestData;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array<int, string>
     */
    public function via($notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return MailMessage
     */
    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array<string, mixed>
     */
    public function toArray($notifiable): array
    {
        if (!$this->employee) {
            return [];
        }

        return [
            'nom' => $this->employee->nom, // Access employee properties as needed
            ...$this->requestData
        ];
    }
}
